var express = require('express');
var session = require('express-session');
var sessionFileStore = require('session-file-store');
var rp = require('request-promise');
var path = require('path');
var https = require('https');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const persist = require('node-persist');

const googleapi = require('./googleapi.js');
const scheduler = require('./scheduler.js');

const config = require('./config.js');
const fs = require('fs');

var webOsservice;
var webOsprintDbgMsg;

var app = express();
var fileStore = sessionFileStore(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(config.logPath + '/access.log', {flags: 'a'});

// setup the logger
app.use(logger('combined', {stream: accessLogStream}));

// setup scheduler
scheduler.registerSchedule(config.checkSharedAlbumInterval, scheduler.checkUpdate);
scheduler.registerSchedule(config.refreshTokenInterval, scheduler.refreshToken);

const albumCache = persist.create({
	dir: config.albumCachePath,
	ttl: config.albumCacheTtl
});
albumCache.init();

const photoCache = persist.create({
	dir: config.photoCachePath,
	ttl: config.photoCacheTtl
});
photoCache.init();

const sharedAlbumCache = persist.create({
	dir: config.sharedAlbumCachePath,
	ttl: config.albumCacheTtl
});
sharedAlbumCache.init();

const sessionMiddleware = session({
	resave: false,
	saveUninitialized: true,
	store: new fileStore({path: config.sessionPath}),
	secret: 'connected google photo'
});

// Enable user session handling.
app.use(sessionMiddleware);

// Set up OAuth 2.0 authentication through the passport.js library.
const passport = require('passport');
const auth = require('./auth');
auth.init(passport);

// Set up passport and session handling.
app.use(passport.initialize());
app.use(passport.session());

/* GET home page. */
app.get('/login', function(req, res) {
	if (!req.user) {
		res.redirect('/auth/google');
	} else {
		res.sendFile('index.html', {root: path.join(__dirname, '../build')});
	}
});

// Star the OAuth login process for Google.
app.get('/auth/google', passport.authenticate('google', {
	scope: config.scopes,
	failureFlash: true,  // Display errors to the user.
	session: true,
	accessType: 'offline',
	prompt: 'consent'
}));

// Callback receiver for the OAuth process after log in.
app.get(
	'/auth/google/callback',
	passport.authenticate(
		'google', {
			failureRedirect: '/',
			failureFlash: true,
			session: true
		}
	),
	function (req, res) {
		// User has logged in.
		auth.saveToken(req.user.token);
		auth.saveRefreshToken(req.user.refreshToken);
		res.sendFile('index.html', {root: path.join(__dirname, '../build')});
	}
);

// Returns all albums owned by the user.
app.get('/photo/getAlbumList', async function (req, res) {
	let token = googleapi.getToken();
	if (token != undefined) {
		const cachedAlbums = await albumCache.getItem('albumList');
		if (cachedAlbums) {
			res.status(200).send(cachedAlbums);
		} else {
			const {result, error} = await googleapi.getAlbumList(req, token);
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				res.status(401).send('User token is not valid. Please log in again.');
			} else {
				res.status(200).send(result);
				albumCache.setItem('albumList', result);
			}
		}
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Returns pictures from selected album.
app.get('/photo/album/:albumId', async function (req, res) {
	let parameters = {
		albumId: req.params.albumId,
		pageSize: config.searchPageSize
	};
	let token = googleapi.getToken();
	if (token != undefined) {
		const cachedPhotos = await photoCache.getItem(parameters.albumId);
		if (cachedPhotos) {
			cachedPhotos.pictures.reverse();
			res.status(200).send(cachedPhotos);
		} else {
			const {result, error} = await googleapi.getSearchedPhotoList(parameters, token);
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				res.status(401).send('User token is not valid. Please log in again.');
			} else {
				photoCache.setItem(parameters.albumId, result);
				var reversedResult = Object.assign({}, result);
				reversedResult.pictures.reverse();
				res.status(200).send(reversedResult);
			}
		}
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Lists all shared albums available in the Sharing tab of the user's Google Photos app.
app.get('/photo/getSharedAlbumList', async function (req, res) {
	let token = googleapi.getToken();
	if (token != undefined) {
		const cachedSharedAlbums = await sharedAlbumCache.getItem('shareAlbumList');
		if (cachedSharedAlbums) {
			res.status(200).send(cachedSharedAlbums);
		} else {
			const {result, error} = await googleapi.getSharedAlbumList(req, token);
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				res.status(401).send('User token is not valid. Please log in again.');
			} else {
				res.status(200).send(result);
				sharedAlbumCache.setItem('shareAlbumList', result);
			}
		}
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Returns filtered pictures from selected album.
app.post('/photo/search', async function (req, res) {
	let parameters = {
		pageSize: config.searchPageSize,
		filters: {contentFilter: {includedContentCategories:req.body.filters}}
	};
	let token = googleapi.getToken();
	let cacheKey = 'FILTERS:' + req.body.filters.toString();
	if (token != undefined) {
		const cachedPhotos = await photoCache.getItem(cacheKey);
		if (cachedPhotos) {
			res.status(200).send(cachedPhotos);
		} else {
			const {result} = await googleapi.getSearchedPhotoList(parameters, token);
			res.status(200).send(result);
			photoCache.setItem(cacheKey, result);
		}
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Returns if user logged in.
app.get('/getAuth', function (req, res) {
	try {
		if (!googleapi.getToken()) {
			res.status(200).send(JSON.stringify({auth: false}));
		} else {
			res.status(200).send(JSON.stringify({auth: true}));
		}
	} catch (err) {
		res.status(200).send(JSON.stringify({auth: false}));
	}
});

// Returns filter list.
app.get('/photo/getFilterList', function (req, res) {
	res.status(200).send(JSON.stringify({filterList:config.filterList}));
});

// Returns updated album information.
app.get('/photo/getAlbumUpdate', function (req, res) {
	let updateInfo = fs.readFileSync(config.albumUpdateInfoPath, 'utf-8');
	res.status(200).send(updateInfo);
});

app.get('/push', async function (req, res) {
	webOsprintDbgMsg('[googlephoto Service] push Called...');
	try {
		await scheduler.checkUpdate();
	} catch (error) {
		res.status(200).send({result: false, message: error.message});
	}

	let albumId = '';
	try {
		albumId = JSON.parse(fs.readFileSync(config.albumUpdateInfoPath, 'utf-8')).updateList[0].id;
	} catch (error) {
		res.status(200).send({result: false, message: 'No update'});
	}
	const {result, error} = await googleapi.getSearchedPhotoList({albumId: albumId}, googleapi.getToken());
	if (!error) {
		let url = result.pictures[result.pictures.length-1].baseUrl + '=w900-h900';
		let filename = result.pictures[result.pictures.length-1].filename;
		let imgPath = config.persistPath + '/' + filename;

		// remove cache so that server refresh the cache
		// fs.rmdirSync(config.sharedAlbumCachePath);
		await photoCache.removeItem(albumId);

		var file = fs.createWriteStream(imgPath);
		https.get(url, function(response) {
			response.pipe(file);
			file.on('finish', function() {
				try {
					webOsservice.call('luna://com.webos.notification/createToast',
						{
							iconUrl: 'http://127.0.0.1:8090/ms-icon-150x150.png',
							sourceId: 'com.lge.app.viewster',
							onclick: {
								appId: 'com.lge.app.viewster',
								params : {albumId: albumId}
							},
							message: 'You have new photo(s)',
							noaction: false,
							persistent: true,
							extra: {
								images: [
									{uri: imgPath}
								]
							}
						},
						(res) => {}
					);
					webOsprintDbgMsg('[googlephoto Service] push webOsservice called');
					res.status(200).send({result: true});
				} catch (err) {
					res.status(200).send({result: false, message: 'Device does not support webOsservice.'});
				}
			});
		});
	} else {
		res.status(200).send({result: false, error: error});
	}
});

// Request video generation for selected album.
app.get('/generatevideo/:albumId', async function (req, res) {
	let parameters = {
		albumId: req.params.albumId,
		pageSize: config.searchPageSize
	};
	let token = googleapi.getToken();
	const returnValue = {
		result: true
	};

	if (token != undefined) {
		const cachedPhotos = await photoCache.getItem(parameters.albumId);
		if (cachedPhotos) {
			cachedPhotos.pictures.reverse();
			const body = await rp.post(config.videoEndpoint + '/photo/makemovie', {
				headers: {'Content-Type': 'application/json'},
				body: cachedPhotos,
				json: true
			});
			returnValue.videoUrl = body.videoUrl;
		} else {
			const {result, error} = await googleapi.getSearchedPhotoList(parameters, token);
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				returnValue.result = false;
				returnValue.reason = 'User token is not valid. Please log in again.';
			} else {
				const body = await rp.post(config.videoEndpoint + '/photo/makemovie', {
					headers: {'Content-Type': 'application/json'},
					body: result,
					json: true
				});
				returnValue.videoUrl = body.videoUrl;
			}
		}
	} else {
		returnValue.result = false;
		returnValue.reason = 'User not logged in.';
	}

	console.log(returnValue);

	if (returnValue.result) {
		webOsservice.call('luna://com.webos.notification/createToast',
			{
				iconUrl: 'http://127.0.0.1:8090/ms-icon-150x150.png',
				sourceId: 'com.lge.app.viewster',
				onclick: {
					appId: 'com.webos.app.browser',
					params : {target: returnValue.videoUrl}
				},
				message: 'Video has been generated',
				noaction: false,
				persistent: true
			},
			(res) => {}
		);
	}

	res.status(returnValue.result ? 200 : 401).send(returnValue);
});

app.setService = function (service, printDbgMsg) {
	webOsservice = service;
	webOsprintDbgMsg = printDbgMsg;
};

// refresh album list and shared album list
var refreshAlbumList = function() {
	// var date = new Date();
	// console.log(date + ' refreshAlbumList()');
	let token = googleapi.getToken();
	if (token) {
		const {result, error} = googleapi.getAlbumList(null, token);
		if (!error) {
			albumCache.setItem('albumList', result);
		}
		const {res, err} = googleapi.getSharedAlbumList(null, token);
		if (!err) {
			sharedAlbumCache.setItem('shareAlbumList', res);
		}
	}
};
scheduler.registerSchedule(config.refreshAlbumListInterval, refreshAlbumList);

module.exports = app;

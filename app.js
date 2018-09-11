var express = require('express');
var session = require('express-session');
var sessionFileStore = require('session-file-store');
var request = require('request-promise');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const persist = require('node-persist');

const config = require('./config.js');
const fs = require('fs');

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

const albumCache = persist.create({
	dir: config.persistPath + '/persist-albumcache/',
	ttl: config.albumCacheTtl
});
albumCache.init();

const photoCache = persist.create({
	dir: config.persistPath + '/persist-photocache/',
	ttl: config.photoCacheTtl
});
photoCache.init();

const sharedAlbumCache = persist.create({
	dir: config.persistPath + '/persist-sharedAlbumcache/',
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
auth(passport);

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
	session: true
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
		// console.log('callback - req.user: ', req.user);
		fs.writeFile(config.tokenPath, req.user.token, (err) => {
			if (err) throw err;
		});
		res.sendFile('index.html', {root: path.join(__dirname, '../build')});
	}
);

// Returns all albums owned by the user.
app.get('/photo/getAlbumList', async function (req, res) {
	let token = getToken();
	if (token != undefined) {
		const cachedAlbums = await albumCache.getItem(token);
		if (cachedAlbums) {
			res.status(200).send(cachedAlbums);
		} else {
			const {result, error} = await getAlbumList(req, token);
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				res.status(401).send('User token is not valid');
			} else {
				res.status(200).send(result);
				albumCache.setItem(token, result);
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
	let token = getToken();
	if (token != undefined) {
		const cachedPhotos = await photoCache.getItem(parameters.albumId);
		if (cachedPhotos) {
			res.status(200).send(cachedPhotos);
		} else {
			const {result} = await getSearchedPhotoList(parameters, token);
			res.status(200).send(result);
			photoCache.setItem(parameters.albumId, result);
		}
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Lists all shared albums available in the Sharing tab of the user's Google Photos app.
app.get('/photo/getSharedAlbumList', async function (req, res) {
	let token = getToken();
	if (token != undefined) {
		const cachedSharedAlbums = await sharedAlbumCache.getItem(token);
		if (cachedSharedAlbums) {
			res.status(200).send(cachedSharedAlbums);
		} else {
			const {result, error} = await getSharedAlbumList(req, token);
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				res.status(401).send('User token is not valid');
			} else {
				res.status(200).send(result);
				sharedAlbumCache.setItem(token, result);
			}
		}
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Returns filtered pictures from selected album.
app.post('/photo/search', async function (req, res) {
	let parameters = {
		albumId: req.body.albumId,
		pageSize: config.searchPageSize,
		filters: {contentFilter: {includedContentCategories:req.body.filters}}
	};
	let token = getToken();
	let cacheKey = 'FILTERS:' + req.body.filters.toString();
	if (token != undefined) {
		const cachedPhotos = await photoCache.getItem(cacheKey);
		if (cachedPhotos) {
			res.status(200).send(cachedPhotos);
		} else {
			const {result} = await getSearchedPhotoList(parameters, token);
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
		if (!getToken()) {
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

var getToken = function () {
	let token = '';
	try {
		token = fs.readFileSync(config.tokenPath, 'utf-8');
	} catch (err) {
		return null;
	}
	return token;
};

async function getAlbumList (req, token) {
	let parameters = {pageSize: config.albumPageSize};
	let result = {albums: []};
	let error = null;

	try {
		do {
			const body = await request.get(config.apiEndpoint + '/v1/albums', {
				headers: {'Content-Type': 'application/json'},
				qs: parameters,
				json: true,
				auth: {'bearer': token}
			});
			//console.log('body: ', body);
			body.albums.forEach((element) => {
				let album = {
					id: element.id,
					title: element.title,
					totalMediaItems: Number(element.mediaItemsCount),	//string -> number
					coverPhotoBaseUrl: element.coverPhotoBaseUrl
				};
				result.albums.push(album);
			});
			parameters.pageToken = body.nextPageToken;
		} while (parameters.pageToken != null);
	} catch (err) {
		error = new Error('getAlbumList error', err);
	}

	return {result, error};
}

async function getSharedAlbumList (req, token) {
	let parameters = {pageSize: config.albumPageSize};
	let result = {sharedAlbums: []};
	let error = null;

	try {
		do {
			const body = await request.get(config.apiEndpoint + '/v1/sharedAlbums', {
				headers: {'Content-Type': 'application/json'},
				qs: parameters,
				json: true,
				auth: {'bearer': token}
			});
			body.sharedAlbums.forEach((element) => {
				if (element.title) {
					let album = {
						id: element.id,
						title: element.title,
						totalMediaItems: Number(element.mediaItemsCount),	//string -> number
						coverPhotoBaseUrl: element.coverPhotoBaseUrl
					};
					result.sharedAlbums.push(album);
				}
			});
			parameters.pageToken = body.nextPageToken;
		} while (parameters.pageToken != null);
	} catch (err) {
		error = new Error('getSharedAlbumList error', err);
	}
	return {result, error};
}

async function getSearchedPhotoList(parameters, token) {
	let result = {pictures:[]};
	let error = null;

	try {
		do {
			const body = await request.post(config.apiEndpoint + '/v1/mediaItems:search', {
				headers: {'Content-Type': 'application/json'},
				body: parameters,
				json: true,
				auth: {'bearer': token}
			});

			body.mediaItems.forEach((element) => {
				if (element.mimeType && element.mimeType.startsWith('image/')) {
					let picture = {
						id: element.id,
						baseUrl: element.baseUrl,
						mediaMetadata: element.mediaMetadata,
						mimeType: element.mimeType
					};
					result.pictures.push(picture);
				}
			});
			parameters.pageToken = body.nextPageToken;
		} while (parameters.pageToken != null);
	} catch (err) {
		error = new Error('getSearchedPhotoList error', err);
	}
	return {result, error};
}

module.exports = app;

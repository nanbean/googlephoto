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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

const albumCache = persist.create({
	dir: 'persist-albumcache/',
	ttl: 600000,  // 10 minutes
});
albumCache.init();

const sessionMiddleware = session({
	resave: false,
	saveUninitialized: true,
	store: new fileStore({}),
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

// Middleware that adds the user of this session as a local variable,
// so it can be displayed on all pages when logged in.
app.use(function (req, res, next) {
	res.locals.name = '-';
	if (req.user && req.user.profile && req.user.profile.name) {
		res.locals.name =
				req.user.profile.name.givenName || req.user.profile.displayName;
	}

	res.locals.avatarUrl = '';
	if (req.user && req.user.profile && req.user.profile.photos) {
		res.locals.avatarUrl = req.user.profile.photos[0].value;
	}
	next();
});

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
		const userId = req.user.profile.id;
		const cachedAlbums = await albumCache.getItem(userId);
		if (cachedAlbums) {
			res.status(200).send(cachedAlbums);
		} else {
			const {result, error} = await getAlbumList(req, token);	
			if (error) {
				fs.writeFile(config.tokenPath, '');
				req.logout();
				req.session.destroy();
				res.sendFile('index.html', {root: path.join(__dirname, '../build')});
				res.status(401).send('User token is not valid');
			} else {
				res.status(200).send(result);
				albumCache.setItem(userId, result);
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
		const {result} = await getSearchedPhotoList(parameters, token);
		res.status(200).send(result);
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Lists all shared albums available in the Sharing tab of the user's Google Photos app.
app.get('/photo/getSharedAlbumList', function (req, res) {
	let parameters = {pageSize: config.albumPageSize};
	let token = getToken();
	if (token != undefined) {
		request.get(config.apiEndpoint + '/v1/sharedAlbums', {
			headers: {'Content-Type': 'application/json'},
			qs: parameters,
			json: true,
			auth: {'bearer': getToken()}
		}, function (error, response, body) {
			let result = {sharedAlbums: []};
			body.sharedAlbums.forEach((element) => {
				let album = { 
					id: element.id,
					title: element.title,
					totalMediaItems: Number(element.totalMediaItems),	//string -> number
					coverPhotoBaseUrl: element.coverPhotoBaseUrl
				};
				result.sharedAlbums.push(album);
			});
			result.nextPageToken = body.nextPageToken;
			res.status(200).send(result);
		});
	} else {
		res.status(401).send('User not logged in.');
	}
});

app.get('/getAuth', function (req, res) {
	if (!req.user || !req.isAuthenticated()) {
		res.status(200).send(JSON.stringify({auth: false}));
	} else {
		res.status(200).send(JSON.stringify({auth: true}));
	}
});

var getToken = function () {
	let token = fs.readFileSync(config.tokenPath, 'utf-8');
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
					totalMediaItems: Number(element.totalMediaItems),	//string -> number
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

async function getSearchedPhotoList(parameters, token) {
	let result = {pictures:[]};
	let error = null;

	try {
		do {
			const body = await request.post(config.apiEndpoint + '/v1/mediaItems:search', {
				headers: {'Content-Type': 'application/json'},
				qs: parameters,
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

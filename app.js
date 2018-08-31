var express = require('express');
var session = require('express-session');
var sessionFileStore = require('session-file-store');
var request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config.js');

var app = express();
var fileStore = sessionFileStore(session);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

const sessionMiddleware = session({
	resave: true,
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
	if (!req.user || !req.isAuthenticated()) {
		res.redirect('/auth/google');
	} else {
		res.sendFile('index.html', {root: path.join(__dirname, 'build')});
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
		res.sendFile('index.html', {root: path.join(__dirname, 'build')});
	}
);

// Returns all albums owned by the user.
app.get('/photo/getAlbumList', function (req, res) {
	var parameters = {pageSize: config.albumPageSize};
	
	if (req.user && req.user.token) {
		request.get(config.apiEndpoint + '/v1/albums', {
			headers: {'Content-Type': 'application/json'},
			qs: parameters,
			json: true,
			auth: {'bearer': req.user.token}
		}, function (error, response, body) {
			let result = {albums: []};
			body.albums.forEach((element) => {
				let album = { 
					id: element.id,
					title: element.title,
					totalMediaItems: Number(element.totalMediaItems),	//string -> number
					coverPhotoBaseUrl: element.coverPhotoBaseUrl
				};
				result.albums.push(album);
			});
			res.status(200).send(result);
		});
	} else {
		res.status(401).send('User not logged in.');
	}
});

// Returns pictures from selected album.
app.get('/photo/album/:albumId', function (req, res) {
	let parameters = {albumId: req.params.albumId};
	request.post(config.apiEndpoint + '/v1/mediaItems:search', {
		headers: {'Content-Type': 'application/json'},
		json: parameters,
		auth: {'bearer': req.user.token}
	}, function (error, response, body) {
		let result = {pictures:[]};
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
		res.status(200).send(body);
	});
});

app.get('/getAuth', function (req, res) {
	if (!req.user || !req.isAuthenticated()) {
		res.status(200).send(JSON.stringify({auth: false}));
	} else {
		res.status(200).send(JSON.stringify({auth: true}));
	}
});

module.exports = app;

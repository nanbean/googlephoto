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

var sessionFlag = false;

/* GET home page. */
app.get('/login', function(req, res) {
	var sess = sessionFlag;

	if (!sess) {
		res.redirect('/auth/google');
	} else 	if (sess.passport.user.token) {
		res.sendFile('index.html', {root: path.join(__dirname, 'build')});
	} else {
		res.redirect('/auth/google');
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
		sessionFlag = true;
		res.sendFile('index.html', {root: path.join(__dirname, 'build')});
	}
);

// Returns all albums owned by the user.
app.get('/getAlbums', function (req, res) {
	var parameters = {pageSize: config.albumPageSize};

	request.get(config.apiEndpoint + '/v1/albums', {
		headers: {'Content-Type': 'application/json'},
		qs: parameters,
		json: true,
		auth: {'bearer': req.user.token}
	}, function (error, response, body) {
		res.status(200).send(body.albums);
	});
});

app.get('/getAuth', function (req, res) {
	var sess = sessionFlag;

	if (!sess) {
		res.status(200).send(JSON.stringify({auth: false}));
	} else {
		res.status(200).send(JSON.stringify({auth: true}));
	}
});

module.exports = app;

var express = require('express');
var session = require('express-session');
var sessionFileStore = require('session-file-store');
var request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');

const config = require('./config.js');

var app = express();
var fileStore = sessionFileStore(session);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleware = session({
	resave: false,
	saveUninitialized: false,
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
app.get('/', function(req, res) {
	let sess = req.session;
	if (sess.passport == undefined) {
		res.redirect('/auth/google');
	} else 	if (sess.passport.user.token) {
		res.redirect('/getAlbums');
	} else {
		res.redirect('/auth/google');
	}
});


// Start the OAuth login process for Google.
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
		res.redirect('/getAlbums');
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

module.exports = app;

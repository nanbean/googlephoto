const config = require('./config.js');
const refresh = require('passport-oauth2-refresh');
const GoogleOAuth2Strategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');

exports.init = (passport) => {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));
	let strategy = new GoogleOAuth2Strategy(
		{
			clientID: config.oAuthClientID,
			clientSecret: config.oAuthclientSecret,
			callbackURL: config.oAuthCallbackUrl
		},
		(token, refreshToken, profile, done) => {
			// console.log('auth.init()..token:', token, 'refreshToken:', refreshToken);
			done(null, {profile, token, refreshToken});
		}
	);
	passport.use(strategy);
	refresh.use(strategy);
};

let saveToken = (token) => {
	fs.writeFileSync(config.tokenPath, token, 'utf-8');
};
exports.saveToken = saveToken;

let saveRefreshToken = (refreshToken) => {
	fs.writeFileSync(config.refreshTokenPath, refreshToken, 'utf-8');
};
exports.saveRefreshToken = saveRefreshToken;

exports.refresh = () => {
	let savedRefreshToken = '';
	try {
		savedRefreshToken = fs.readFileSync(config.refreshTokenPath, 'utf-8');
	} catch (err) { 
		savedRefreshToken = null;
	}

	if (savedRefreshToken) {
		// console.log('auth.refresh()..refreshToken:', savedRefreshToken);
		refresh.requestNewAccessToken('google', savedRefreshToken, function(err, accessToken, refreshToken) {
			// You have a new access token, store it in the user object,
			// or use it to make a new request.
			// `refreshToken` may or may not exist, depending on the strategy you are using.
			// You probably don't need it anyway, as according to the OAuth 2.0 spec,
			// it should be the same as the initial refresh token.
			// console.log('requestNewAccessToken result..err:', err, 'accessToken:', accessToken, 'refreshToken:', refreshToken);
			if (!err) {
				saveToken(accessToken);
			}
		});
	}
};

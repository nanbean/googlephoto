const config = {};

// The OAuth client ID from the Google Developers console.
config.oAuthClientID = 'your client id';

// The OAuth client secret from the Google Developers console.
config.oAuthclientSecret = 'your client secret';

// The port where the app should listen for requests.
config.port = 8090;

// The callback to use for OAuth requests. This is the URL where the app is
// running. For testing and running it locally, use 127.0.0.1.
config.oAuthCallbackUrl = 'http://127.0.0.1:' + config.port + '/auth/google/callback';

// The scopes to request. The app requires the photoslibrary.readonly and
// plus.me scopes.
config.scopes = [
	'https://www.googleapis.com/auth/photoslibrary.readonly',
	'profile'
];

// The number of photos to load for search requests.
config.photosToLoad = 150;

// The page size to use for search requests. 100 is reccommended.
config.searchPageSize = 100;

// The page size to use for the listing albums request. 50 is reccommended.
config.albumPageSize = 50;

// The API end point to use. Do not change.
config.apiEndpoint = 'https://photoslibrary.googleapis.com';

// Google user login token saved file.
config.tokenPath = './sessions/token';

// TTL value of album list cache(ex. 600000 equals 10 minutes)
config.albumCacheTtl = 1800000;

// TTL value of photo list cache
config.photoCacheTtl = 1800000;

module.exports = config;

const config = {};

// The OAuth client ID from the Google Developers console.
config.oAuthClientID = '364581644668-hr6549bom581he8bdc00k78mnh5u5ndj.apps.googleusercontent.com';

// The OAuth client secret from the Google Developers console.
config.oAuthclientSecret = 'jX4ZMAmEGZjb20JNIvfrDRy7';

// The port where the app should listen for requests.
config.port = 8090;

// The callback to use for OAuth requests. This is the URL where the app is
// running. For testing and running it locally, use 127.0.0.1.
config.oAuthCallbackUrl = 'http://localhost:' + config.port + '/auth/google/callback';

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

// AI filter list
config.filterList = ['NONE', 'LANDSCAPES', 'RECEIPTS', 'CITYSCAPES', 'LANDMARKS',
	'SELFIES','PEOPLE','PETS','WEDDINGS','BIRTHDAYS','DOCUMENTS','TRAVEL','ANIMALS',
	'FOOD','SPORT','NIGHT','PERFORMANCES','WHITEBOARDS','SCREENSHOTS','UTILITY'];

module.exports = config;

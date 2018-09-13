var fs = require('fs');
var request = require('request-promise');
var config = require('./config.js');

exports.getToken = function () {
	let token = '';
	try {
		token = fs.readFileSync(config.tokenPath, 'utf-8');
	} catch (err) {
		return null;
	}
	return token;
};

exports.getAlbumList = async function (req, token) {
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
		error = new Error(err.error.error.message);
	}

	return {result, error};
};

exports.getSharedAlbumList = async function (req, token) {
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
		error = new Error(err.error.error.message);
	}
	return {result, error};
};

exports.getSearchedPhotoList = async function (parameters, token) {
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
						mimeType: element.mimeType,
						filename: element.filename
					};
					result.pictures.push(picture);
				}
			});
			parameters.pageToken = body.nextPageToken;
		} while (parameters.pageToken != null);
	} catch (err) {
		if (err.message) {
			error = new Error(err.message);
		} else if (err.error) {
			error = new Error(err.error.error.message);
		} else {
			error = new Error(err);
		}
	}
	return {result, error};
};

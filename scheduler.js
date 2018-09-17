var schedule = require('node-schedule');
var googleapi = require('./googleapi.js');
var auth = require('./auth.js');
var config = require('./config.js');
var path = require('path');
var fs = require('fs');

async function checkUpdate(){
	// get newest photo list
	let token = googleapi.getToken();
	const {result, error} = await googleapi.getSharedAlbumList(null, token);
	// console.log('checkUpdate.. getSharedAlbumList:', result, '\nerror:', error);
	
	if (!error) {
		// load cached file
		let cachePath = config.sharedAlbumCachePath;
		let cachedFileList = fs.readdirSync(cachePath);
		let newData = result;

		// compare shared album list data with cached data
		for (var i in cachedFileList) {
			let cacheData = JSON.parse(fs.readFileSync(path.join(cachePath, cachedFileList[i]), 'utf-8'));
			// console.log('cacheData:', cacheData);
			if (!cacheData) {
				throw new Error('cached shared album list data not found');
			}
			let updateInfo = {updateList: []};
			
			newData.sharedAlbums.forEach((newAlbum) => {
				cacheData.value.sharedAlbums.forEach((oldAlbum) => {
					if (newAlbum.id == oldAlbum.id && newAlbum.totalMediaItems > oldAlbum.totalMediaItems) {
						// console.log('oldAlbum:', oldAlbum, 'newAlbum:', newAlbum);
						let albumUpdate = {};
						albumUpdate.id = newAlbum.id;
						albumUpdate.title = newAlbum.title;
						albumUpdate.updateCount = newAlbum.totalMediaItems - oldAlbum.totalMediaItems;
						updateInfo.updateList.push(albumUpdate);
					}
				});
			});
			// write update info upon result file
			//console.log('updateInfo:', JSON.stringify(updateInfo));
			fs.writeFileSync(config.albumUpdateInfoPath, JSON.stringify(updateInfo), 'utf-8');
		}
	}
}

async function refreshToken() {
	auth.refresh();
}

exports.registerSchedule = (interval, next) => {
	schedule.scheduleJob(interval, next);
};

exports.checkUpdate = checkUpdate;
exports.refreshToken = refreshToken;

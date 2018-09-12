var schedule = require('node-schedule');
var googleapi = require('./googleapi.js');
var config = require('./config.js');
var path = require('path');
var fs = require('fs');

module.exports = schedule.scheduleJob(config.checkSharedAlbumInterval, checkUpdate);

async function checkUpdate(){
	// get newest photo list
	let token = googleapi.getToken();
	const {result, error} = await googleapi.getSharedAlbumList(null, token);
	// console.log('scheduler.. getSharedAlbumList:', result, '\nerror:', error);
	
	if (!error) {
		// load cached file
		let cachePath = config.sharedAlbumCachePath;
		let cachedFileList = fs.readdirSync(cachePath);
		let newData = result;

		// compare shared album list data with cached data
		for (var i in cachedFileList) {
			let cacheData = JSON.parse(fs.readFileSync(path.join(cachePath, cachedFileList[i]), 'utf-8'));
			// console.log('cacheData:', cacheData);
			let updateInfo = {updateList: []};
			
			newData.sharedAlbums.forEach((newAlbum) => {
				cacheData.value.sharedAlbums.forEach((oldAlbum) => {
					if (newAlbum.id == oldAlbum.id && newAlbum.totalMediaItems > oldAlbum.totalMediaItems) {
						// console.log('oldAlbum:', oldAlbum, 'newAlbum:', newAlbum);
						let albumUpdate = {};
						albumUpdate.id = newAlbum.id;
						albumUpdate.title = newAlbum.title;
						albumUpdate.updateCount = newAlbum.totalMediaItems - oldAlbum.totalMediaItems;
						albumUpdate.newPhotoUrl = ''; // latest photo of this album
						updateInfo.updateList.push(albumUpdate);
					}
				});
			});
			// for (var j in updateInfo.updateList) {
			// 	var albumId = updateInfo.updateList[j].id;
			// 	const {album, err} = await googleapi.getSearchedPhotoList({ albumId:albumId }, token);
			// 	if (!err) {
			// 		// console.log('album:', album);
			// 	}
			// }
			// console.log('updateInfo: ', JSON.stringify(updateInfo));
			// write update info upon result file
			fs.writeFile(config.albumUpdateInfoPath, JSON.stringify(updateInfo), function() {});
		}

		
	}
	


}
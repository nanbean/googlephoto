var videoshow = require('videoshow');

var videoOptions = {
	fps: 25,
	loop: 5, // seconds
	transition: true,
	transitionDuration: 1, // seconds
	videoBitrate: 1024,
	videoCodec: 'libx264',
	size: '640x?',
	audioBitrate: '128k',
	audioChannels: 2,
	format: 'mp4',
	pixelFormat: 'yuv420p'
};

var makevideo = async function(images, target, next){
	// console.log('makevideo() images:', images);
	videoshow(images, videoOptions)
		.audio('./public/family.mp3')
		.save(target)
		.on('start', function (command) {
			// console.log('ffmpeg process started:', command);
		})
		.on('error', function (err, stdout, stderr) {
			// console.error('Error:', err);
			// console.error('ffmpeg stderr:', stderr);
		})
		.on('end', function (output) {
			// console.error('Video created in:', output);
			next(output);
		});
};

exports.makevideo = makevideo;
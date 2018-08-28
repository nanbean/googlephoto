var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// console.log('req.user:', req.user);
	if (!req.user || !req.isAuthenticated()) {
		// Not logged in yet.
		res.redirect('/auth/google');
	} else {
		res.redirect('/getAlbums');
	}
});

module.exports = router;

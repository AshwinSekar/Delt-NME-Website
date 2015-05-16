var express = require('express');
var router = express.Router();

router.post('/', function(res, req, next) {
	console.log(req);
});

module.exports = router;
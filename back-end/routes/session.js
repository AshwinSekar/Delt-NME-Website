var express = require('express');
var router = express.Router();
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/pledges.db'
});
var jsSHA = require("jssha");

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var sha1 = new jsSHA("SHA-1","TEXT");
    sha1.update(req.body.password)
    var password = sha1.getHash("HEX");
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.find({email : email}, function(err,docs) {
        	if (err) {
        		return next({
        			status: 500,
        			message: err
        		});
        	}
        	if (docs == null || docs.length == 0 || docs[0].password != password) {
                return next({
                    status: 401
                });
        	} else {
        		var pledge = docs[0];
        		res.status(201).json({
        			success: true,
        			api_key: {
        				access_token: pledge.access_token,
                        user_id: pledge.id
        			}
        		});
        	}
        });
    });
});

module.exports = router;
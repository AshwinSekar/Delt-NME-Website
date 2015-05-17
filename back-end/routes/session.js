var express = require('express');
var router = express.Router();
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/pledges.db'
});

router.post('/', function(res, req, next) {
    var email = req.req.body.email;
    var password = req.req.body.password;
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
        	if (docs == null || docs.length == 0) {
        		res.status(201).json({
        			success: false
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
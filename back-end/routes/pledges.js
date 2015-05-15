var express = require('express');
var router = express.Router();
var Pledge = require('../models/pledge');
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/pledges.db'
});


/* Generate password */
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
/* GET pledges listing. */
router.get('/', function(req, res, next) {
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        var pledges = datastore.getAllData().sort(function(a, b) {
            return a.firstName.localeCompare(b.firstName);
        });
        res.status(200).json({
            pledges: pledges
        });
    });
});

/* POST pledges listing. */
router.post('/', function(req, res, next) {
    if (!req.body.pledge) {
        return next({
            status: 400,
            message: "Bad request (No pledge model in body)"
        });
    }

    var isMaster = req.body.pledge.isMaster;
    var firstName = req.body.pledge.firstName;
    var lastName = req.body.pledge.lastName;
    var numberInterviewsDone = 0;
    var brothersInterviewed = {};
    var name = req.body.pledge.name;
    var email = req.body.pledge.email;
    var password = randomString(8,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var apiKeys = {};
    var errors = {};

    if ((typeof isMaster !== 'boolean') || !firstName || !lastName || !name || !email) {
        return next({
            status: 400,
            message: "One of these is bad: " + isMaster + "," + firstName + "," + lastName + "," + name + "," + email
        });
    }

    var pledge = new Pledge(isMaster, 
    						firstName,
    						lastName, 
    						numberInterviewsDone, 
    						brothersInterviewed, 
    						name, 
    						email, 
    						password, 
    						apiKeys, 
    						errors);

    datastore.loadDatabase(function(err) {
    	if(err) {
    		return next({
    			status: 500,
    			message: err
    		});
    	}

    	datastore.insert(pledge, function(err) {
    		if (err) {
    			return next({
    				status: 500,
    				message: err
    			});
    		}

    		res.status(201).json({
    			pledge: pledge
    		});
    	});
    });

});

module.exports = router;
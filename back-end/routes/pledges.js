var express = require('express');
var router = express.Router();
var Pledge = require('../models/pledge');
var nedb = require('nedb');
var datastore = new nedb('pledges');

/* GET pledges listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;	
}

/* POST pledges listing. */
router.post('/', function(req, res, next) {
    if (req.body.pledge) {
        return next({
            status: 400
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

    if (!isMaster || !firstName || !lastName || !name || !email || !password || !password_confirmation) {
        return next({
            status: 400
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
    						password_confirmation, 
    						apiKeys, 
    						errors);
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

module.exports = router;
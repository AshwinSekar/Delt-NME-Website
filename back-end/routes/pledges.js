var express = require('express');
var router = express.Router();
var Pledge = require('../models/pledge');
var nedb = require('nedb');
var datastore = new nedb('pledges');

/* GET pledges listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


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
    var password = req.body.pledge.password;
    var password_confirmation = req.body.pledge.password_confirmation;
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
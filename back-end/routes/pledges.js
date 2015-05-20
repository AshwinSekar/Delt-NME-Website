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
/* GET all pledges listing. */
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

/* GET pledge by id listing. */
router.get('/:pledge_id', function(req, res, next) {
    var id = req.params.pledge_id;
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.find({
            id: id
        }, function(err, docs) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            res.status(200).json({
                pledge: docs[0]
            });
        });
    });
});

/* PUT pledge by id listing. */
router.put('/:pledge_id', function(req, res, next) {
    var id = req.params.pledge_id;
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.update({
            id: id
        }, {
            $set: req.body.pledge
        }, {}, function(err, numReplaced) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }

            datastore.find({
                id: id
            }, function(err, docs) {
                if (err) {
                    return next({
                        status: 500,
                        message: err
                    });
                }
                res.status(200).json({
                    pledge: docs[0]
                });
            });
        })
    });
});

/* DELETE pledge by id listing. */
router.delete('/:pledge_id', function(req, res, next) {
    var id = req.params.pledge_id;
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastore.remove({
            id: id
        }, {}, function(err, numRemoved) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            res.sendStatus(204);
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
    var brothersInterviewed = [];
    var email = req.body.pledge.email;
    var password = randomString(8,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var apiKeys = [];
    var errors = {};
    if ((typeof isMaster !== 'boolean') || !firstName || !lastName || !email) {
        return next({
            status: 400,
            message: "One of these is bad: " + isMaster + "," + firstName + "," + lastName + "," + email
        });
    }
    var pledge = new Pledge(isMaster, 
    						firstName,
    						lastName, 
    						numberInterviewsDone, 
    						brothersInterviewed, 
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
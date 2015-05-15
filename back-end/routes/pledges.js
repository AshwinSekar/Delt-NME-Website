var express = require('express');
var router = express.Router();

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
    
});

module.exports = router;
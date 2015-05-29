var express = require('express');
var router = express.Router();
var nedb = require('nedb');
var datastorePledges = new nedb({
    filename: 'data/pledges.db'
});
var datastoreBrothers = new nedb({
    filename: 'data/brothers.db'
})

router.post('/', function(req, res, next) {
    var pledgeId = req.body.pledgeId;
    var brotherId = req.body.brotherId;
    var year = req.body.year;
    var answer = req.body.answer;
    datastoreBrothers.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        datastoreBrothers.find({
            id: brotherId
        }, function(err, docs) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            if (docs == null || docs.length == 0) {
                return next({
                    status: 403,
                    message: "Invalid brother, stop trying to hax"
                });
            } else {
                var brother = docs[0];
                datastorePledges.loadDatabase(function(err) {
                    if (err) {
                        return next({
                            status: 500,
                            message: err
                        });
                    }
                    if (brother.answer !== answer || brother.year !== year) {
                        // Pledge failed the interview
                        datastorePledges.update({
                            id: pledgeId
                        }, {
                            $addToSet: {
                                brothersFailed: brother.id
                            }
                        }, {}, function(err) {
                            if (err) {
                                return next({
                                    status: 500,
                                    message: err
                                });
                            }
                            res.status(201).json({
                                passed: false
                            });
                        });
                    } else {
                        // Pledge passed the interview
                        datastorePledges.update({
                            id: pledgeId
                        }, {
                            $addToSet: {
                                brothersInterviewed: brother.id
                            }
                        }, {}, function(err) {
                            if (err) {
                                return next({
                                    status: 500,
                                    message: err
                                });
                            }
                            res.status(201).json({
                                passed: true
                            });
                        });
                    }

                });
            }
        });
    });
});

module.exports = router;
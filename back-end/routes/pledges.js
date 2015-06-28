var express = require('express');
var router = express.Router();
var Pledge = require('../models/pledge');
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/pledges.db'
});
var jwt = require('jsonwebtoken');


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
    var header = req.headers.authorization;
    if (!header) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
    var token = header.split(" ")[1]
    if (!token) {
        return next({
            status: 401,
            message: "Invalid token"
        })
    }
    var id = req.params.pledge_id;
    jwt.verify(token, "ayy lmao", function(err, decoded) {
        if (err) {
            return next({
                status: 401,
                message: err
            })
        }
        var reqID = decoded.id;
        datastore.loadDatabase(function(err) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            datastore.find({
                id: reqID
            }, function(err, docs) {
                if (err) {
                    return next({
                        status: 500,
                        message: err
                    });
                }
                if (!docs[0].isMaster && id != reqID) {
                    return next({
                        status: 401,
                        message: "Unauthorized"
                    })
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
                });
            });
        });
    });
});

/* DELETE pledge by id listing. */
router.delete('/:pledge_id', function(req, res, next) {
    var header = req.headers.authorization;
    if (!header) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
    var token = header.split(" ")[1]
    if (!token) {
        return next({
            status: 401,
            message: "Invalid token"
        })
    }
    var id = req.params.pledge_id;
    jwt.verify(token, "ayy lmao", function(err, decoded) {
        if (err) {
            return next({
                status: 401,
                message: err
            })
        }
        var reqID = decoded.id;
        datastore.loadDatabase(function(err) {
            if (err) {
                return next({
                    status: 500,
                    message: err
                });
            }
            datastore.find({
                id: reqID
            }, function(err, docs) {
                if (err) {
                    return next({
                        status: 500,
                        message: err
                    });
                }
                if (!docs[0].isMaster) {
                    return next({
                        status: 401,
                        message: "Unauthorized"
                    })
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
    });
});

/* POST pledges listing. */
router.post('/', function(req, res, next) {
    var header = req.headers.authorization;
    if (!header) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
    var token = header.split(" ")[1]
    if (!token) {
        return next({
            status: 401,
            message: "Invalid token"
        })
    }
    if (!req.body.pledge) {
        return next({
            status: 400,
            message: "Bad request (No pledge model in body)"
        });
    }
    jwt.verify(token, "ayy lmao", function(err, decoded) {
        if (err) {
            return next({
                status: 401,
                message: err
            })
        }
        var id = decoded.id;
        var isMaster = req.body.pledge.isMaster;
        var firstName = req.body.pledge.firstName;
        var lastName = req.body.pledge.lastName;
        var numberInterviewsDone = 0;
        var brothersInterviewed = [];
        var email = req.body.pledge.email;
        var password = email;
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
                if (!docs[0].isMaster) {
                    return next({
                        status: 401,
                        message: "Unauthorized"
                    })
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
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Brother = require('../models/brother');
var nedb = require('nedb');
var datastore = new nedb({
    filename: 'data/brothers.db'
});
var pledgeDatastore = new nedb({
    filename: 'data/pledges.db'
});
var jwt = require('jsonwebtoken')


/* GET all brothers listing. */
router.get('/', function(req, res, next) {
    datastore.loadDatabase(function(err) {
        if (err) {
            return next({
                status: 500,
                message: err
            });
        }
        var brothers = datastore.getAllData().sort(function(a, b) {
            return a.firstName.localeCompare(b.firstName);
        });
        res.status(200).json({
            brothers: brothers
        });
    });
});

/* GET brother by id listing. */
router.get('/:brother_id', function(req, res, next) {
    var id = req.params.brother_id;
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
                brother: docs[0]
            });
        });
    });
});

/* PUT brother by id listing. */
router.put('/:brother_id', function(req, res, next) {
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
    var id = req.params.brother_id;
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
            pledgeDatastore.loadDatabase(function(err) {
                pledgeDatastore.find({
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
                    datastore.update({
                        id: id
                    }, {
                        $set: req.body.brother
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
                                brother: docs[0]
                            });
                        });
                    });
                });
            });
        });
    });
});

/* DELETE brother by id listing. */
router.delete('/:brother_id', function(req, res, next) {
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
    var id = req.params.brother_id;
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
            pledgeDatastore.loadDatabase(function(err) {
                pledgeDatastore.find({
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
            })
        });
    });
});

/* POST brother listing. */
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
    if (!req.body.brother) {
        return next({
            status: 400,
            message: "Bad request (No brother model in body)"
        });
    }

    var firstName = req.body.brother.firstName;
    var lastName = req.body.brother.lastName;
    var year = req.body.brother.year;
    var question = req.body.brother.question;
    var answer = req.body.brother.answer;
    var fa1 = req.body.brother.falseAnswer1;
    var fa2 = req.body.brother.falseAnswer2;
    var fa3 = req.body.brother.falseAnswer3;
    var fa4 = req.body.brother.falseAnswer4;

    if (!firstName || !lastName || !year || !question || !answer || !fa1 || !fa2 || !fa3 || !fa4)
        return next({
            status: 400,
            message: "Incomplete model"
        });

    var brother = new Brother(firstName, lastName, year, question, answer, fa1, fa2, fa3, fa4);

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
            pledgeDatastore.loadDatabase(function(err) {
                pledgeDatastore.find({
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
                    datastore.insert(brother, function(err) {
                        if (err) {
                            return next({
                                status: 500,
                                message: err + " brother:" + brother
                            });
                        }
                        res.status(201).json({
                            brother: brother
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;

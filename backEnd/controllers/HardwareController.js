var Hardware = require('./../models/Hardware');
module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Hardware.findOne({_id: req.params.id}, function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            });
        }
        if (!req.params.id) {
            Hardware.find(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json(err);
                }
                ;
            });
        }
    },
    create: function (req, res) {
        var data = req.body;
        Hardware.create(data, function (err, result) {
            if (!err) {
                res.status(200).json(result);
            } else {
                var detail = err;
                res.status(500).json(detail);
                console.log(detail);
            }
        });
    },
    update: function (req, res) {
        var data = req.body;
        Hardware.findById(req.params.id, function (err, find) {
            if (!err) {
                Hardware.findOneAndUpdate({_id: req.params.id}, data, function (err, result) {
                    if (!err) {
                        res.status(200).json(result);
                    } else {
                        var detail = err;
                        res.status(500).json(detail);
                        console.log(detail);
                    }
                });
            } else {
                var detail = err;
                res.status(500).json(detail);
                console.log(detail);
            }

        });
    },
    delete: function (req, res) {
        Hardware.findOne({_id: req.params.id}, function (err, result) {
            Hardware.remove({_id: req.params.id}, function (err) {
                res.json(result);
            });
        });

    }
};
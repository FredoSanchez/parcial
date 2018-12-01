var mongoose = require('mongoose');
movieModel = require('../models/Movie');

let controller = {};

controller.getAll = function(req, res){
    movieModel.find({}, function(err, users){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                users
            });
        }
    });
};

controller.getOne = function(req, res){
    movieModel.findOne({_id: req.params.id}, function(err, user){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                user
            });
        }
    });
};

controller.update = function(req, res){
    let update = {
        name: req.body.name,
        gender: req.body.gender,
        year: req.body.year
    }
    movieModel.findByIdAndUpdate(req.params.id, update,function(err, old){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                old,
                update
            });
        }
    })
};

controller.insert = function(req, res){
    let newMovie = new movieModel({
        name: req.body.name,
        gender: req.body.gender,
        year: req.body.year
    });
    newMovie.save(function(err, inserted){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                inserted
            });
        }
    });
};

controller.delete = function(req, res){
    movieModel.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                deleted
            });
        }
    });
};

module.exports = controller;
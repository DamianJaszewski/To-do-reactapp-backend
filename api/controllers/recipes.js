//model przepisów
const Recipe = require("../models/recipe");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.recipes_get_schowAll = (req, res, next) => {
    Recipe.find()
    .then(result => {
        res.status(200).json({
            wiadomość: "Lista wszystkich przepisów",
            info: result
        })
    })
    .catch(err => res.status(500).json({wiadomość:err}));
}

exports.recipes_post_newRecipe = (req, res, next) => {  
    console.log(req.file);
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        time: req.body.time,
        difficulty: req.body.difficulty
    });

    recipe.save()
    .then(result => {
        res.status(200).json({
            wiadomość: "Dodanie nowego przepisu",
            info: result
        })
    })
    .catch(err => res.status(500).json({wiadomość:err}));

    res.status(200).json({
        wiadomość: "Dodanie nowego przepisu",
        info: recipe

     });
}

exports.recipes_get_by_id = (req, res, next) => {
    const id = req.params.przepisId;
    Recipe.findById(id).exec()
    .then(result => {
    res.status(200).json({
        wiadomość: "Szczegóły przepisu o numerze:" + id,
        info: result
        });
    })
    .catch(err => res.status(500).json({wiadomość:err}));
}

exports.recipes_put_change = (req, res, next) => {
    const id = req.params.przepisId;
    Recipe.findByIdAndUpdate(
        id, 
        {
            "name": req.body.name,
            "time": req.body.time,
            "difficulty": req.body.difficulty
        },
        {new:true}
        ).exec()
        .then(result => {
            
            res.status(200).json({
                wiadomość: "Zmiana przepisu o numerze:" + id,
                info: result
             });

        })
        .catch(err => res.status(500).json({wiadomość:err}));
}

exports.recipes_delete_removeRecipeById = (req, res, next) => {
    const id = req.params.przepisId;
    Recipe.findByIdAndDelete(id).exec()
    .then(result => {
         res.status(200).json({
         wiadomość: "Usuniecie przepisu o numerze:" + id,
         info: result
         })
       .catch(err => res.status(500).json({wiadomość:err}))
});
}
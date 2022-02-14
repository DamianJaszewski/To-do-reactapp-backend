//model przepisów
const Todo = require("../models/todo");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.todos_get_schowAll = (req, res, next) => {
    Todo.find()
    .then(result => {
        res.status(200).json({
            wiadomość: "Lista wszystkich zadań",
            info: result
        })
    })
    .catch(err => res.status(500).json({wiadomość:err}));
}

exports.todos_post_newTodo = (req, res, next) => {  
    console.log(req.file);
    const currentDate = new Date();
    const newDate = currentDate.setDate(currentDate.getDate() + 2);
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        userId: 1,
        category: req.body.category,
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        completed: false,
    });

    todo.save()
    .then(result => {
        res.status(200).json({
            wiadomość: "Dodanie nowego zadania",
            info: result
        })
    })
    .catch(err => res.status(500).json({wiadomość:err}));

    res.status(200).json({
        wiadomość: "Dodanie nowego zadania",
        info: todo

     });
}

exports.todos_get_by_id = (req, res, next) => {
    const day = req.params.day;
    Todo.findOne(id).exec()
    .then(result => {
    res.status(200).json({
        wiadomość: "Szczegóły zadania o numerze:" + id,
        info: result
        });
    })
    .catch(err => res.status(500).json({wiadomość:err}));
}

exports.todos_put_change = (req, res, next) => {
    const id = req.params.id;
    const newTitle = req.body.newTitle;
    Todo.findByIdAndUpdate(
        id, 
        {
            "title": newTitle,
        },
        {new:true}
        ).exec()
        .then(result => {
            
            res.status(200).json({
                wiadomość: "Zmiana zadania o numerze:" + id,
                info: result
             });

        })
        .catch(err => res.status(500).json({wiadomość:err}));
}

exports.todos_put_change_done = (req, res, next) => {
    const id = req.params.id;
    const completed = req.body.completed;
    Todo.findByIdAndUpdate(
        id, 
        {
            "completed": ((completed == true) ? false : true),
        },
        {new:true}
        ).exec()
        .then(result => {
            
            res.status(200).json({
                wiadomość: "Zmiana zadania o numerze:" + id,
                info: result
             });

        })
        .catch(err => res.status(500).json({wiadomość:err}));
}

exports.todos_delete_removeTodoById = (req, res, next) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id).exec()
    .then(result => {
         res.status(200).json({
         wiadomość: "Usuniecie zadania o numerze:" + id,
         info: result
         })
       .catch(err => res.status(500).json({wiadomość:err}))
});
}
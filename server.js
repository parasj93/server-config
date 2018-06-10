const express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');

var app = express();

app.listen(3000, () => {
    console.log('Connected to DB', 3000);
})

app.use(bodyParser.json());

var mongoose = require('./db/mongoose');
var Todo = require('./modals/todo');
var User = require('./modals/users');

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    })

    todo.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});


app.get('/todos', (req, res) => {
    Todo.find().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
})


app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();

    }

    Todo.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    })
})

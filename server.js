require('./config/config')

const _ = require('lodash');
const express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Started up at`, port);
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
        res.send({ doc });
    }).catch((err) => {
        res.status(404).send();
    })
})


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();

    }

    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    })
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectId.isValid(id)) {
        res.status(404).send();

    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();

    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }

        res.send({ doc });
    }).catch((err) => {
        res.status(400).send();
    })

}); 
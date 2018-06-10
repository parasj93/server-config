var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

module.exports =  mongoose.model('Todo',todoSchema);



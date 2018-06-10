var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);



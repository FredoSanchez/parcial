var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        required: true
    },
    year: Number
});

module.exports = mongoose.model('Movie', MovieSchema);
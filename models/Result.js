const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ResultSchema = new Schema({
    test_id: {
        type: Number,
        // unique: true
    },
    name: {
        type: String
    },
    start_time: {
        type: Date
    },
    elapsed_time: {
        type: Number
    },
    creation_date: {
        type: Date,
        // default: new Date(),
        default: Date.now
    }
});

module.exports = Result = mongoose.model('result', ResultSchema);

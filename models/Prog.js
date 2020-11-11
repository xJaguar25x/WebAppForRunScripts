const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProgSchema = new Schema({
    prog_name: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
    meta: {
        type: String
    },
    creation_date: {
        type: Date,
        default: new Date()
    }
});

module.exports = Prog = mongoose.model('prog', ProgSchema);

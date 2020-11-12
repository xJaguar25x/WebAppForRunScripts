const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
    test_name: {
        type: String,
        required: true
    },
    prog_id: {
        type: String
    },
    compiler_id: {
        type: String
    },
    creation_date: {
        type: Date,
        default: new Date()
    }
});

module.exports = Test = mongoose.model('test', TestSchema);

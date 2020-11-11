const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CompilerSchema = new Schema({
    compiler_name: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
    command_to_compile: {
        type: String
    },
    command_to_run: {
        type: String
    },
    creation_date: {
        type: Date,
        default: new Date()
    }
});

module.exports = Compiler = mongoose.model('compiler', CompilerSchema);
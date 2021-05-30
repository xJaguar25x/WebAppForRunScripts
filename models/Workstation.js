const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const WorkstationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
    },
    description: {
        type: String,
        default: null
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Workstation = mongoose.model('workstation', WorkstationSchema);

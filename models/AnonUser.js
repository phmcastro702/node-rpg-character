const mongoose = require("mongoose");


const anonUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        expires: '24h',
        default: Date.now
    }
});


module.exports = mongoose.model('AnonUser', anonUserSchema, 'anonUsers');
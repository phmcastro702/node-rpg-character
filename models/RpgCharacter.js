const mongoose = require('mongoose');


const rpgCharacterSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: [true, 'need an ownerId'],
        // the ownerId should always be assigned in character creation but if something goes wrong the
        // 'ownerId' is set to the string 'anon'
        default: 'anon'
    },
    name: {
        type: String,
        required: [true, 'RPG character\'s name is required']
    },
    battlefieldName: {
        type: String,
        required: [true, 'RPG character\'s battlefield name is required']
    },
    race: {
        type: String,
        required: [true, 'RPG character\'s race is required']
    },
    class: {
        type: String,
        required: [true, 'RPG character\'s class is required']
    },
    createdAt: {
        type: Date,
        expires: '24h'
    }
});

module.exports = mongoose.model('RpgCharacter', rpgCharacterSchema, 'rpgcharacters');
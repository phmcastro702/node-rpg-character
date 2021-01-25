// const mongoose = require('mongoose');

// // TODO: implement a kind of 'ownerId' so every character is linked to some user
// // and we can retrieve a list of characters based on the logged user session

// // Defining our data schema!
// const rpgCharacterSchema = new mongoose.Schema({
//   ownerId: {
//     type: String,
//     required: false,
//     // default: get some kind of session ID/Cookie (for not logged users)
//   },
//   name: {
//     type: String,
//     required: [true, 'RPG character\'s name is required']
//   },
//   battlefieldName: {
//     type: String,
//     required: [true, 'RPG character\'s battlefield name is required']
//   },
//   race: {
//     type: String,
//     required: [true, 'RPG character\'s race is required']
//   },
//   class: {
//     type: String,
//     required: [true, 'RPG character\'s class is required']
//   },

// });

// const RpgCharacters = mongoose.model('RpgCharacters', rpgCharacterSchema);

// module.exports = RpgCharacters;
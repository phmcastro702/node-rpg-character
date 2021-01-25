const router = require('express').Router();
const rpgCharacterModel = require('../models/rpgCharacterSchema');





router.get('/show', async (req, res) => {
    const rpgCharacters = await rpgCharacterModel.find({});

    try {
        res.render('show.ejs', { data: rpgCharacters });
    } catch (err) {
        res.status(500).send(err);
    }

});

router.post('/show', async (req, res) => {
    const newCharacter = new rpgCharacterModel(req.body);

    await newCharacter.save((err, doc) => {
        if (err) return res.status(500).send(err);

        console.log(`data: ${doc} was successfully saved`);
        res.redirect('/show');
    });


});

module.exports = router;
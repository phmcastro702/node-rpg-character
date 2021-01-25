const router = require('express').Router();
const User = require('../models/User');
const RpgCharacter = require('../models/RpgCharacter');
const { verifyRefreshToken } = require('../middlewares/verifyToken');
const AnonUser = require('../models/AnonUser');



router.get('/index', verifyRefreshToken, async (req, res) => {

    if (!req.user._id) {
        res.clearCookie('jid');
        return res.redirect('/');
    }

    let currentUser = await User.findById(req.user._id, '-_id username');
    // try anon users collection
    if (!currentUser) {
        currentUser = await AnonUser.findById(req.user._id, '-_id username');
    }

    try {
        res.render('users/index', { data: { greetMessage: `Welcome, ${currentUser.username}` } });
    } catch (err) {
        res.status(500).send('failed to load index page');
    }

});




router.get('/show', verifyRefreshToken, async (req, res) => {

    const userRpgCharacterLibrary = await RpgCharacter.find({ ownerId: req.user._id });

    const characterLibraryTitle = userRpgCharacterLibrary.length ? 'Your Character Library:'
        : 'Your library is empty, try creating a character';

    try {
        res.render('users/show', { data: { characterLibrary: userRpgCharacterLibrary, title: characterLibraryTitle } });
    } catch (err) {
        res.status(500).send(err);
    }
});


router.post('/show', verifyRefreshToken, async (req, res) => {
    const characterObject = req.body;
    characterObject.ownerId = req.user._id;

    if (req.user.loginType === 'anon') { characterObject.createdAt = Date.now(); }


    const newCharacter = new RpgCharacter(characterObject);

    try {
        const savedCharacter = await newCharacter.save();
        res.redirect('/in/show');
    } catch (err) {
        res.status(400).send(err);
    }

});

router.route('/edit', verifyRefreshToken)
    .get(async (req, res) => {
        const characterToEdit = await RpgCharacter.findById(req.query.id);

        res.render('users/edit', { data: { characterLibrary: [characterToEdit] } });
    })
    .post(async (req, res) => {
        try {
            const updatedCharacter = await RpgCharacter.findByIdAndUpdate(req.query.id, req.body, { useFindAndModify: false });
            res.redirect('/in/show');
        } catch (err) {
            console.log('error updating character in the DB  :::: ' + err);
        }

    });

//TODO refresh page or update characters table after ajax delete call
router.delete('/show', verifyRefreshToken, async (req, res) => {
    try {
        const deletedCharacter = await RpgCharacter.findByIdAndRemove(req.query.id, { useFindAndModify: false });
    } catch (err) {
        console.log(`error deleting character: ${err}`);
    }
});

router.route('/delete', verifyRefreshToken)
    .get(async (req, res) => {
        try {
            const deletedCharacter = await RpgCharacter.findByIdAndRemove(req.query.id, { useFindAndModify: false });
            res.redirect('back');
        } catch (err) {
            console.log(`error deleting character: ${err}`);
        }
    });



module.exports = router;
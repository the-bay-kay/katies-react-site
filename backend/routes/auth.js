const router = require('express').Router();
require ('dotenv').config();

// right now it uses posts auth... cry
router.route('/').post((req, res) => {
    if (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD) {
        res.json('Logged in!');
    }
    else {
        console.log('Sad');
        res.status(400).json('Error: ');
    }
});

module.exports = router;
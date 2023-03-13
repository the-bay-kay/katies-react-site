const router = require('express').Router();
require ('dotenv').config();

const crypto = require('crypto');
let adminName = process.env.USERNAME;

const hashPassword = (string) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const iterations = 10000;
    const hash = crypto.pbkdf2Sync(string, salt, iterations, 64, 'sha512');
    return {
        salt: salt,
        iterations: iterations,
        hash: hash.toString('hex')
    }
}

const validatePassword = (hashObj) => {
    salt = hashObj.salt;
    iterations = hashObj.iterations;
    hash = hashObj.hash;
    const checkHash = crypto.pbkdf2Sync(process.env.ENCRYPTION_SECRET, salt, iterations, 64, 'sha512').toString('hex');
    if (checkHash === hash) { // gotta be a better way to compare...
        return true
    }
    return false
}

// Login / setup cookie 
router.route('/').post((req, res) => {
    if (req.body.user.username === adminName && req.body.user.password === process.env.PASSWORD) {
        const key = hashPassword(process.env.ENCRYPTION_SECRET);
        res
            .status(202)
            .json(key)
        return
    }
    res.status(400).json('Error! Bad Password')
});

//middleware? maybe change routing :)
router.route('/readCookie').post((req, res) => {
    const isValid = validatePassword(req.body.token)
    if (isValid) {
        res.status(202).json({status: true})
    }
    else {
        res.status(400).json('Error! Bad Cookie')
    }
    return
});

router.route('/deleteCookie').get((req, res) => {
    console.log('deleting...')
    res
        .status(202)
        .clearCookie('token', req.body.username)
        .send('cookies cleared!')
});

module.exports = router;
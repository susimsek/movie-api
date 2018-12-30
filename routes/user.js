const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds).then((hash) => {
        const user = new User({
            username,
            password: hash
        });
        const promise = user.save();

        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });
});

router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;

    const promise = User.findOne({username});

    promise.then((user) => {
        if (user === null) {
            res.json({
                status: false,
                message: `Authentication failed, ${username} Not found.`
            });
        } else {
            console.log(user.password);
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: `Authentication failed,wrong password.`
                    });
                } else {
                    const payload = {
                        username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 // 12 saat dakika cinsinden
                    });
                    res.json({
                        status: true,
                        token: token
                    });
                }
            });

        }

    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;

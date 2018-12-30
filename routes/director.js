const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');


router.post('/', (req, res) => {
    const movie = new Director(req.body);
    const promise = movie.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;

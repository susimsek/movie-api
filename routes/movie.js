const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
    const promise = Movie.find({});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/:movie_id', (req, res, next) => {
    const movie_id = req.params.movie_id;
    const promise = Movie.findById(movie_id);

    promise.then((data) => {
        if (!data) {
            const message = 'The movie was not found';
            next({message: message, code: 999});
        }

        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

});

router.put('/:movie_id', (req, res, next) => {
    const movie_id = req.params.movie_id;
    const promise = Movie.findByIdAndUpdate(movie_id, req.body);

    promise.then((data) => {
        if (!data) {
            const message = 'The movie was not found';
            next({message: message, code: 999});
        }

        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

});

router.post('/', (req, res) => {
    const movie = new Movie(req.body);
    const promise = movie.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;

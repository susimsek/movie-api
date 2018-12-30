const mongoose = require('mongoose');
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

router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true//Filmi olmayan Yönetmenleride getir
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }

            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }


    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/:director_id', (req, res) => {
    const director_id = req.params.director_id;

    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true//Filmi olmayan Yönetmenleride getir
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }

            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }


    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.put('/:director_id', (req, res, next) => {
    const director_id = req.params.director_id;
    const promise = Director.findByIdAndUpdate(
        director_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((data) => {
        if (data === null) {
            const message = 'The director was not found';
            next({message: message, code: 999});
        } else {
            res.json(data);
        }


    }).catch((err) => {
        res.json(err);
    })

});

router.delete('/:director_id', (req, res, next) => {
    const director_id = req.params.director_id;
    const promise = Director.findByIdAndRemove(director_id);

    promise.then((data) => {
        if (data === null) {
            const message = 'The director was not found';
            next({message: message, code: 999});
        } else {
            res.json(data);
        }
    }).catch((err) => {
        res.json(err);
    })

});

module.exports = router;

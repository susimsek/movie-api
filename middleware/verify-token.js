const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = (req, res, next) => {
    const baseUrl = req.protocol + '://' + req.headers.host;
    const token = req.headers["x-access-token"] || req.body.token || req.query.token;

    const promise = axios({
        method: 'post',
        url: `${baseUrl}/validateToken`,
        data: {
            token: token
        }
    });

    promise.then(function (response) {
        const {active} = response.data;
        if (active) {
            next();
        } else {
            res.json(response.data);
        }

    }).catch(function (error) {
        res.json(error.toString());
    });


};
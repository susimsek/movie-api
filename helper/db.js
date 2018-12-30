const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://root:admin123@ds145434.mlab.com:45434/movie-api', {useNewUrlParser: true});

    mongoose.connection.on('open', () => {
        console.log('MongoDB:connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB:Error', err);
    });
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;

};
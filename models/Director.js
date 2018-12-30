const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [60, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [2, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    surname: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [60, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [2, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    bio: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [1000, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [10, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);
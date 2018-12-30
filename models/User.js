const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [60, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [5, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [60, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [5, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);
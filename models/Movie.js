const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [15, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [1, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    category: {
        type: String,
        maxlength: [30, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [3, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    country: {
        type: String,
        maxlength: [30, '`{PATH}` (`{VALUE}`),{MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [3, '`{PATH}` (`{VALUE}`),{MINLENGTH} karakterden büyük olmalıdır.']
    },
    year: {
        type: Number,
        max: [2040, '`{PATH}` (`{VALUE}`),{MAX} yılından küçük veya eşit olmalıdır.'],
        min: [1900, '`{PATH}` (`{VALUE}`),{MIN} yılından büyük veya eşit olmalıdır.']
    },
    imdb_score: {
        type: Number,
        max: [10, '`{PATH}` (`{VALUE}`),{MAX} değerinden küçük veya eşit olmalıdır.'],
        min: [0, '`{PATH}` (`{VALUE}`),{MIN} değerinden büyük veya eşit olmalıdır.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);
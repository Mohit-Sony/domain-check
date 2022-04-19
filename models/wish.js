const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    domain: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;
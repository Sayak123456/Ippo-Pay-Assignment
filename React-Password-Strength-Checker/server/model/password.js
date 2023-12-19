const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isStrong: {
        type: Boolean,
        required: true,
        default: false,
    },
    distanceFromStrong: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('password', passwordSchema);
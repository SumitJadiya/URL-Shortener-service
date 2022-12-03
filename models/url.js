const mongoose = require('mongoose')
const db = require('../config/database')

const URL = new mongoose.Schema(
    {
        longUrl: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        shortUrl: {
            type: String,
            unique: true,
            index: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('URL', URL)

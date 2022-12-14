const express = require('express')
const router = express.Router()
const { encodeUrl, decodeUrl } = require('../controllers/url')

// route for encode string
router.post('/', encodeUrl)

// route for decode string
router.get('/:shortString', decodeUrl)

module.exports = router

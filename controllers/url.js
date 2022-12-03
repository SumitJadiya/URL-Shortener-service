const URL = require('../models/url')

// encodes the URL
exports.encodeUrl = async (req, res) => {
    let longUrl = req.body.longString
    let encodedString = encodeToShortUrl(longUrl)
    let existingLongURL = await findShortenedURLForExistingLongURL(longUrl)

    if (!longUrl) throwError(res, 'Please Enter Correct String')
    else if (existingLongURL.length > 0) {
        return returnDecodedShortURLString(res, existingLongURL)
    } else {
        const urlResult = await URL.create({
            shortUrl: encodedString,
            longUrl: longUrl,
        })
        return res.status(200).json({
            success: true,
            greeting: `URL shortened!`,
            urlResult,
        })
    }
}

// decodes the URL
exports.decodeUrl = async (req, res) => {
    let shortUrl = req.params.shortString
    const shortenedUrl = await URL.find({ shortUrl: shortUrl })
    return returnDecodedLongURLString(res, shortenedUrl)
}

// algorithm to encode URL -> 64^9 unique strings
function encodeToShortUrl(longUrl) {
    const randomDigits =
        'ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyz0987654321'
    let len = randomDigits.length

    let result = ''
    for (let i = 0; i < 9; i++)
        result += randomDigits[Math.floor(Math.random() * len)] // generate short URL

    return result
}

// check if long url available
async function findShortenedURLForExistingLongURL(longUrl) {
    return await URL.find({ longUrl })
}

function returnDecodedShortURLString(res, existingLongURL) {
    let decodedString = existingLongURL[0].shortUrl
    return res.status(200).json({ decodedString })
}

function returnDecodedLongURLString(res, shortenedUrl) {
    let decodedString = shortenedUrl[0].longUrl
    return res.status(200).json({ decodedString })
}

// custom exception method
const throwError = (res, message) => {
    return res.status(400).json({
        error: message,
    })
}

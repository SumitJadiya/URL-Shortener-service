const URL = require("../models/url")

// encodes the URL
exports.encodeUrl = async (req, res) => {

    let longUrl = req.body.longString
    let encodedString = encodeToShortUrl(longUrl)

    if (!longUrl)
        throwError(res, "Please Enter Correct String")
    else {
        const urlResult = await URL.create({
                shortUrl: encodedString,
                longUrl: longUrl
            });
            return res.status(200).json({
                success: true,
                greeting: `URL shortened!`,
                urlResult
              });
    }
}


// decodes the URL
exports.decodeUrl = async (req, res) => {

    let shortUrl = req.params.shortString

    const shortenedUrl = await URL.find({shortUrl: shortUrl})

    let decodedString = shortenedUrl[0].longUrl

    return res.status(200).json({ decodedString })

    // URL.findOne({ where: { shortUrl: shortUrl } })
    //     .then(function (result) {
    //         let decodedString = result.dataValues.longUrl
    //         return res.status(200).json({ decodedString })
    //     }).catch(function (error) {
    //         throwError(res, error)
    //     })
}

// algorithm to encode URL -> 64^9 unique strings
function encodeToShortUrl(longUrl) {

    const randomDigits = 'ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyz0987654321';
    let len = randomDigits.length;

    let result = '';
    for (let i = 0; i < 9; i++)
        result += randomDigits[Math.floor(Math.random() * len)]; // generate short URL

    return result;
}

// check if short url available
async function findShortURL(shortUrl, longUrl, res) {
    const isPresent = await URL.findOne({ where: { shortUrl: shortUrl } })

    if (isPresent) return res.status(400).json({ "message": "Short String Already Present!" });
    else {
        URL
            .find({
                where: { longUrl: longUrl, shortUrl: shortUrl },
                defaults: { shortUrl: shortUrl, longUrl: longUrl }
            }).then((msg) => res.status(200).json(msg))
    }
};

// custom exception method
const throwError = (res, message) => {
    return res.status(400).json({
        error: message
    })
}

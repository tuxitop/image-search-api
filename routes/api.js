/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const GoogleSearch = require('google-search');

// load environment variables
require('dotenv').config();

router.get("/imagesearch/:searchstr", (req, res, next) => {
    // Google only supports up to 100 search items. so let's check if the
    // offset is too much before running the query.
    if (+req.query.offset && +req.query.offset > 90) {
        res.status(400).send({
            error: "You've hit the bottom. The offset can't be more than 90"
        });
        return;
    }

    // Define google search.
    let googleSearch = new GoogleSearch({
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_CX,
    });

    googleSearch.build({
        q: req.params.searchstr,
        num: 10,
        searchType: "image",
        start: parseInt(req.query.offset) || 1
    }, (err, response) => {
        if (err) {
            return next(error);
        }

        // check if there was any errors
        if (response.error) {
            res.status(400).send({
                error: "If you are a developer, make sure you have used a valid google API and google CX key",
            });
            return;
        }
        
        // Make the final json to return
        let results = [];
        response.items.forEach((result) => {
            results.push({
                url: result.link,
                snippet: result.snippet,
                thumbnail: result.image.thumbnailLink,
                context: result.image.contextLink
            });
        });
        res.send(results);
    });
});

module.exports = router;

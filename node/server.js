const express = require('express')
const app = express()
const PORT = 8000;
const { getTrendingVideos } = require('../database/getTrending');
const { getVideo } = require('../database/getVideo');
const { processTrendingVideos } = require('./process');

app.use(function (req, res, next) {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
});

app.get('/videos', function (req, res) {
    getTrendingVideos(req, res);
});
app.get('/videos/refresh', function (req, res) {
    processTrendingVideos().then(() => res.send('{"message": "Refreshed Sucessfuly"}'));
});
app.get('/videos/:id', function (req, res) {
    getVideo(req, res);
});

app.listen(PORT, () => {
    console.log(`Node server listening at http://localhost:${PORT}`)
});
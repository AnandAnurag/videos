const { connection: conn } = require('./connection');

const updateChannels = function (channels = {}) {
    let connection = conn();
    connection.connect();
    for (let cid in channels) {
        const channel = channels[cid];
        const cols = Object.keys(channel).join(",");
        const values = Object.values(channel).map(v => sanitize(v)).join(",");
        const updateCols = ["thumbnail", "description", "name", "subscribers"].map(k => `${k}=${sanitize(channel[k])}`).join(",")
        const command = `INSERT INTO channels (${cols})
    VALUES (${values})
    ON DUPLICATE KEY UPDATE ${updateCols}`;
        connection.query(command, function (error, results, fields) {
            if (error)
                console.log(command)
        });
    }
    connection.end();
}
const updateVideosList = function (trending = []) {
    let connection = conn();
    connection.connect();
    for (let video of trending) {
        const cols = Object.keys(video).join(",");
        const values = Object.values(video).map(v => sanitize(v)).join(",");
        const updateCols = ["views", "likes", "dislikes", "thumbnail", "description", "title"].map(k => `${k}=${sanitize(video[k])}`).join(",")
        const command = `INSERT INTO trending (${cols})
        VALUES (${values})
        ON DUPLICATE KEY UPDATE ${updateCols}`;
        connection.query(command, function (error, results, fields) {
            if (error)
                console.log(error);
        });
    }
    connection.end();
}
function sanitize(s) {
    return s !== null ? `"${s.replace(/"/g, '\\"')}"` : 'NULL';
}
module.exports = {
    updateVideosList,
    updateChannels
}
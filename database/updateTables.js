const { connection: conn } = require('./connection');

const updateChannels = function (channels = {}) {
    let connection = conn();
    connection.connect();
    for (let cid in channels) {
        const channel = channels[cid];
        const command = `INSERT INTO channels SET ?  ON DUPLICATE KEY UPDATE ?`;
        connection.query(command, [channels[cid], channels[cid]], function (error, results, fields) {
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
        const command = `INSERT INTO trending SET ? ON DUPLICATE KEY UPDATE ?`;
        connection.query(command, [video, video], function (error, results, fields) {
            if (error)
                console.log(error);
        });
    }
    connection.end();
}
module.exports = {
    updateVideosList,
    updateChannels
}
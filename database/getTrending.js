const { connection: conn } = require('./connection');

const getTrendingVideos = function (req, res) {
    let connection = conn();
    connection.connect();
    const command = `SELECT t.*, c.name FROM trending t JOIN channels c USING(cid) ORDER BY t.update_time DESC`;
    connection.query(command, function (error, results, fields) {
        if (error)
            console.log(error)
        res.send(results)
    });
    connection.end();
};
module.exports = {
    getTrendingVideos
}
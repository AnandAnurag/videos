const { connection: conn } = require('./connection');

const getVideo = function (req, res) {
    let connection = conn();
    connection.connect();
    const command = `SELECT t.*, c.name FROM trending t JOIN channels c USING(cid) WHERE t.vid = "${req.params.id}"`;
    connection.query(command, function (error, results, fields) {
        if (error)
            console.log(error)
        res.send(results)
    });
    connection.end();
};
module.exports = {
    getVideo
}
const { connection: conn } = require('./connection');
const { processIndividualVideo } = require('../node/process');
const getVideo = function (req, res) {
    let connection = conn();
    connection.connect();
    const command = `SELECT t.*, c.name, c.subscribers, c.thumbnail AS logo FROM trending t JOIN channels c USING(cid) WHERE t.vid = "${req.params.id}"`;
    connection.query(command, function (error, results, fields) {
        if (error)
            console.log(error);
        const rows = results;
        if (rows.length) {
            let { vid, cid, stale } = rows[0];
            if (stale) {
                console.log(vid, cid, stale);
                setTimeout(processIndividualVideo, 0, vid, cid);
            }
        }
        res.send(results);
    });
    connection.end();
};
module.exports = {
    getVideo
}
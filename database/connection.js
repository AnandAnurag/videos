const mysql = require('mysql');
const fs = require('fs');
const configJSON = fs.readFileSync(__dirname + "/db_config.json", { encoding: 'utf8', flag: 'r' });
const config = JSON.parse(configJSON);
const connection = () => mysql.createConnection(config);
module.exports = {
    connection
}


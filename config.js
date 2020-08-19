const mysql = require('mysql');
const connection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "password",

    database: "memory"

});

module.exports = connection;

connection.connect(function (err) {

    if (err) throw err;

    var sql = "CREATE TABLE IF NOT EXISTS score (id INT AUTO_INCREMENT PRIMARY KEY, duree VARCHAR(255), aGagne TINYINT(1))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
});

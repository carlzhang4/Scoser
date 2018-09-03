var mysql = require('mysql');

exports.db_connect = function () {
    var db_connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '19050817',
        database : 'designer'
        //debug    : 'true' //打开试试看？
    });
    return db_connection;
};
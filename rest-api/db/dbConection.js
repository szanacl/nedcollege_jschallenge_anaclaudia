const mysql = require('mysql');

const conection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_blog'
});

module.exports = conection;
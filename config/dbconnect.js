var mysql = require('mysql');

var MySQLConnection = {};
var MySQLConPool = {};

var USER = 'root';
var PWD = '';
var DATABASE = 'cubet';
var DB_HOST_NAME = 'localhost';
var DB_PORT = 3306;

var MAX_POOL_SIZE = 200;
var MIN_POOL_SIZE = 10;

var MySQLConPool = mysql.createPool({
    host: DB_HOST_NAME,
    user: USER,
    password: PWD,
    database: DATABASE,
    acquireTimeout: 5000,
    connectionLimit: MAX_POOL_SIZE,
    debug: false,
    multipleStatements: true
});
exports.MySQLConPool = MySQLConPool;

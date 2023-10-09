const { Sequelize } = require('sequelize');
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const conn = new Sequelize("mysql://avnadmin:AVNS_QUDKyLHvQFQMuqTcc2h@mysql-365e68a1-capstoneproject-group30.aivencloud.com:19317/defaultdb?ssl-mode=REQUIRED", {
    ssl: fs.readFileSync(path.join(__dirname,'ca.pem')),
    dialect: 'mysql',
    logging: false
});

module.exports = conn;
const { Sequelize } = require('sequelize');
const mysql = require('mysql2')
const fs = require('fs')
const pathtoCaPem = ('./app/model/ca.pem')

const conn = new Sequelize("mysql://avnadmin:AVNS_QUDKyLHvQFQMuqTcc2h@mysql-365e68a1-capstoneproject-group30.aivencloud.com:19317/defaultdb?ssl-mode=REQUIRED", {
    ssl: fs.readFileSync(pathtoCaPem),
    dialect: 'mysql',
    logging: false
});

module.exports = conn;
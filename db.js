const sequelize = require('sequelize')
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const conn = new sequelize.Sequelize("mysql://avnadmin:AVNS_QUDKyLHvQFQMuqTcc2h@mysql-365e68a1-capstoneproject-group30.aivencloud.com:19317/defaultdb?ssl-mode=REQUIRED", {
    ssl: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    dialect: 'mysql',
    logging: false
});


const users = conn.define("users", {
    id: {type: sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nama: {type: sequelize.DataTypes.STRING, allowNull: false},
    email:{type:sequelize.DataTypes.STRING, allowNull: false},
    pass: {type: sequelize.DataTypes.STRING, allowNull: false},
 }
, 
{
    freezeTableName: true,
    timestamps: false
})


module.exports = {
    conn,
    users,
}
const Sequelize = require('sequelize');

const sequelize = new Sequelize('system_login', 'root', '447733', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const db = {};

module.exports = sequelize

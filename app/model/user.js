const { DataTypes } = require('sequelize');
const conn = require('./index'); 

const User = conn.define('User', {
  
  id: { type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
  },

  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, 
});

module.exports = User ;

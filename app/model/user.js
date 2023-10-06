const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

const User = sequelize.define('User', {
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
  createdAt: 'created_at', 
  updatedAt: 'updated_at', 
});

module.exports = User;

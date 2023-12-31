const { Sequelize, DataTypes } = require('sequelize');
const conn = require('./index');

const Booking = conn.define('Booking', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
  },
  birthdate: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.ENUM('male','Female','prefer not to say'),
    allowNull: true, 
    defaultValue: null, 
  },
  service: {
    type: DataTypes.ENUM('Dental Checkup', 'Teeth Cleaning', 'Cavity Fillings', 'Braces Installation', 'Teeth Whitening', 'Gum Treatment', 'Denture Fitting'),
    allowNull: true, 
    defaultValue: null, 
  },
  appointment_date: {
    type: DataTypes.DATE,
  },
});

module.exports = Booking;
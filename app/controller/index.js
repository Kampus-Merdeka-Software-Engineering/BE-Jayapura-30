require('dotenv').config();
const nodemailer = require('nodemailer');
const User  = require('../model/user'); 
const Booking = require('../model/booking');
const { request } = require('express');


// Register function
async function register(req, res) {
  try {
    const { nama, email, password } = req.body;

    // Create a new user 
    const newUser = await User.create({ nama, email, password });

    res.json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Login function
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email:email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Authentication successful
    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Booking function
async function booking(req, res) {
  try {
    const { full_name, email, phone_number, birthdate, service, appointment_date } = req.body;

    // Cari pengguna berdasarkan alamat email
    const user = await User.findOne({ where: { email:email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Buat booking dengan user_id yang terkait
    const newBooking = await Booking.create({
      full_name,
      email,
      phone_number,
      birthdate,
      service,
      appointment_date,
      user_id: User.id, //
    });

    // Kirim email konfirmasi ke pengguna
    const smtpUsername = process.env.SMTP_USERNAME;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
       user: smtpUsername,
       pass: smtpPassword,
      },
     });

    const mailOptions = {
      from: 'omandentalcare@gmail.com',
      to: user.email,
      subject: 'Booking Confirmation',
      text: 'Thankyou, We are pleased to inform you that your appointment has been successfully scheduled with Oman Dental Care. Thank you for choosing us, and we look forward to serving you. ',
    };

    // Kirim email konfirmasi
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Pesan tidak dapat dikirim:', error);
      } else {
        console.log('Pesan telah berhasil dikirim:', info.response);
      }
    });

    res.json({ success: true, message: 'Booking successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}



module.exports = { register, login, booking };

const User  = require('../model/user'); 
const Booking = require('../model/booking')
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
    const { full_name, email, phone_number, birthdate, service, appointment_date} = req.body;

    // Proceed to create the booking with the valid user_id
    const newBooking = await Booking.create({
      full_name,
      email,
      phone_number,
      birthdate,
      service,
      appointment_date,
    });

    // Handle the response for the successful booking creation
    res.json({ success: true, message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { register, login, booking };

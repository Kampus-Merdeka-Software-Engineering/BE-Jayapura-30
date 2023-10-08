const express = require("express");
const cors = require('cors');
const { Sequelize } = require('sequelize');
const mainRouter = require('./app/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 4500;

const sequelize = new Sequelize('system_login', 'root', '447733', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

app.use("/", mainRouter);


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database authenticated');
    await sequelize.sync({ alter: true }); // Synchronize database schema for non-destructive migrations
    app.listen(port, () => {
      console.log('Server is running on port 4500');
    });
  } catch (error) {
    console.error('Error authenticating database:', error);
    process.exit(1);
  }
}

startServer();
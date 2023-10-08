const express = require("express");
const cors = require('cors');
const { Sequelize } = require('sequelize');
const mainRouter = require('./app/routes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", mainRouter);


const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  dialect:'mysql'
});



const port = 4500
app.listen(port, function(){
    console.log("server start on", port)
    sequelize.authenticate()
    .then(function(){
        console.log("Database terhubung")
    })
    .catch(function(err){
        console.log("Error saat koneksi ke database", err)
        process.exit()
    })
})


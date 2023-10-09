const express = require("express");
const cors = require('cors');
const mainRouter = require('./app/routes');
const conn = require("./app/model/index");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", mainRouter);


const port = process.env.PORT || 3000;

app.listen(port,"0.0.0.0", function(){
    console.log("server start on", port)
    conn.authenticate()
    .then(function(){
        console.log("Database terhubung")
    })
    .catch(function(err){
        console.log("Error saat koneksi ke database", err)
        process.exit()
    })
})


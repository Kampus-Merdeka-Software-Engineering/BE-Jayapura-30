const express = require("express");
const cors = require('cors');
const path = require('path');
const db = require('./db');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('/static/login.html'); // Use relative paths
});

router.post('/register', function (req, res, next) {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
        return res.status(400).json({
            message: "EMPTY FIELD"
        });
    }

    db.users.create({
        nama,
        email,
        password
    })
    .then(() => {
        res.status(201).json({
            message: "user berhasil terdaftar"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to register user",
            error: err
        });
    });
});

router.post('/login', function (req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "EMPTY FIELD"
        });
    }

    db.users.findOne({
        where: {
            email,
            password
        }
    })
    .then(data => {
        if (data) {
            res.status(200).json({
                message: "success login",
                data: data
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to log in",
            error: err
        });
    });
});

router.get('/home', function (req, res, next) {
    res.redirect('/static/home.html'); // Use relative paths
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use("/", router);

const port = 4500;
app.listen(port, function () {
    db.conn.authenticate()
        .then(function () {
            console.log("Database terhubung");
        })
        .catch(function (err) {
            console.log("Database gagal terhubung karena:", err);
        });
    console.log("server start on", port);
});

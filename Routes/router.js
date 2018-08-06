const mongoClient = require("../Database/db");
const express = require('express');
const mailClient = require('../Modules/modules');
const jwt = require('jsonwebtoken');
const mongoUrl = require('../Modules/Config');
const router = express.Router();



/**
 * Routers
 */

//register Route
router.post("/SignUpUser", (req, res) => {
    var host = req.header('host');
    if (req.body.Email && req.body.Email != " ") {
        mongoClient.connect("mongodb://localhost:27017/", function (err, db) {
            if (err) throw err;
            var dbo = db.db("TestDB");
            var myobj = { Username: req.body.Email, Password: req.body.Password };
            dbo.collection("customers").insertOne(myobj, function (err, res) {
                if (err) throw err;
                jwt.sign({
                    id: 1,
                    Email: req.body.Email
                }, 'secretKey', (tokenErr, token) => {
                    if (tokenErr) throw tokenErr;
                    mailClient.sendVerificationMail(host, req.body.Email, token);
                });
                db.close();
            });
        });
        res.send("A mail has sent to you at " + req.body.Email + ". Please verify by clicking on the link.");
    } else {
        res.send("Please provide email");
    }

});


//login routes
router.post("/Dashboard", (req, res) => {
    res.send("Welcome to the Login Screen..!")
});

/**
 * Export Routers
 */
module.exports = router;
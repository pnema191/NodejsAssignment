/** -------- Requires -------- **/
const http = require('http');
const os = require("os");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes/router");
const auth = require("./Routes//Auth")

/** -------- Config -------- **/
var app = express();

/** -------- MiddleWare Start -------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/** -------- Register Routes -------- **/

app.use("/api/v1/signup", routes);
app.use("/api/v1/login",verify, routes);
app.use("/api/v1/verify",auth);

function verify(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(8080, () => {
    console.log(`Started up at port ${8080}`);
});
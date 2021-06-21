import config from "./config/config";
import express from "express"; // This is to include ExpressJs Library in the nodejs.
import mongoose from "mongoose";
mongoose.Promise = require('bluebird');
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import cookieParser from 'cookie-parser';

import intializePassport from "./config/passport-config";

intializePassport(passport);
var app = new express(); // Create a object for express library

app.use(passport.initialize())
app.use(cookieParser());
app.use(passport.session())


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
//define next middleware to fire res status when api goes wrong.
app.use(cors());  // adding middleware..
import routes from "./config/routes";
// use res.render to load up an ejs view file

console.log(config);

mongoose.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to DB successfully!');
    }
});


app.use('/', routes);

app.listen(config.port, function () {
    console.log('Listing port: ' + config.port)
});

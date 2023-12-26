require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash');
const fs = require('fs');

// Passport Config
require('./config/passport')(passport);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/book', require('./routes/book.js'));

// app.use('/admin', require('./routes/admin.js'));
app.get('*', function(req, res){
  res.render("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
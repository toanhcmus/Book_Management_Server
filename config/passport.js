const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Load User model
const User = require("../models/admin");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
       
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
          
          const userFind = await User.selectUser(username);
        //   console.log(user);

          if (userFind.length === 0) {
            // console.log("user not found!");
            return done(null, false, { message: 'Tài khoản chưa được đăng ký!' });
          } else {
            const user = userFind[0];

            bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Mật khẩu không đúng!' });
                }
              });
          }
        })
      );
};

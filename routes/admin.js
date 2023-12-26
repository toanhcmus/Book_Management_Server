require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const admin = require('../models/admin');

const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');

  //GET SIGN-IN PAGE
  router.get('/sign-in', forwardAuthenticatedUser, (req, res) => res.render('sign-in'));

  //GET SIGN-UP PAGE
  router.get('/sign-up', forwardAuthenticatedUser, (req, res) => res.render('sign-up'));

  //SIGN-UP
  router.post('/sign-up', async (req, res) => {
    const { MSSV, pword1, pword2} = req.body;
    let errors = [];
  
    if (!MSSV || !pword1 || !pword2 ) {
      errors.push({ msg: 'Vui lòng nhập đầy đủ các trường!' });
    }
  
    if (pword1 != pword2) {
      errors.push({ msg: 'Mật khẩu không khớp!' });
    }
  
    if (pword1.length < 8) {
      errors.push({ msg: 'Mật khẩu phải có ít nhất 8 ký tự!' });
    }
  
    if (errors.length > 0) {
      res.render('sign-up', {
        errors,
        MSSV,
        pword1,
        pword2,
      });
    } else {
      const user = await admin.selectUser(MSSV);
      console.log(user);
      if (user.length > 0) {
        errors.push({ msg: 'Tài khoản đã tồn tại' });
          res.render('sign-up', {
            errors,
            MSSV,
            pword1,
            pword2,
          });
      } else {
        const user = {
            username: MSSV,
            password: pword1,
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
              if (err) throw err;
              user.password = hash;
              const rs = await admin.insertUser(user);
               if (rs) {
                req.flash(
                    'success_msg',
                    'Bạn đã đăng ký và có thể đăng nhập'
                  );
                  res.redirect('/admin/sign-in');
               }
            });
          });

      }
    }
  });

  //SIGN-IN
  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/admin/sign-in',
      failureFlash: true
    })(req, res, next);
  });
  
  //LOGOUT
  router.get('/log-out', (req, res) => {
    req.logout(function(err) {
      if (!err) {
        //req.flash('success_msg', 'You are logged out');
        res.redirect('/');
      }
    });
    
  });

  module.exports = router;


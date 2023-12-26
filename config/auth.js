module.exports = {
    ensureAuthenticatedUser: function(req, res, next) {
      // console.log(req);
      if (req.user === undefined)
      {
          req.flash('error_msg', 'Vui lòng đăng nhập!');
          res.redirect('/admin/sign-in');
      } else 
      {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Vui lòng đăng nhập!');
        res.redirect('/admin/sign-in');
      }
      
    },
    forwardAuthenticatedUser: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.render('home');
    },
  };
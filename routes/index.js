const express = require('express');
const router = express.Router();

// Welcome Page
router.get("/", async (req, res) => {
  if (req.session.passport === undefined) {
    res.render("sign-in", {session: 0});
  }
  else {
    // console.log("count: " + countList.length);
    res.render("home", {session: 1, 
                        userSession: req.session.passport.user
                    });
  }
});

module.exports = router;

const Bill = require("../models/bill")

class billC {
    async pageCreate(req, res) {
        try {
            res.render("bill", {
                session: 1, 
                userSession: req.session.passport.user,
            });
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
}

module.exports = new billC;
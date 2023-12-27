const Customer = require("../models/customer")

class customerC {
    async pageCustomer(req, res) {
        try {
            
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
}

module.exports = new customerC;
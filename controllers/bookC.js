const Book = require("../models/book")

class bookC {
    async pageImport(req, res) {
        // let id = req.params.id;
        // const proDetail = await Product.selectProductByID(id);
        try {
            res.render("importBook", {
                session: 1, 
                userSession: req.session.passport.user,
            });
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
}

module.exports = new bookC;
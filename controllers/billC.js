const Bill = require("../models/bill");
const Customer = require("../models/customer");
const Book = require("../models/book");
const { all } = require("../routes/customer");

class billC {
    async pageCreate(req, res) {
        try {
            res.render("bill", {
                session: 1, 
                userSession: req.session.passport.user,
                checkCustomer: 2
            });
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
    async pageBill(req, res) {
        try {
            let customerName = req.params.name;
            let customerPhone = req.params.phone;
            console.log(customerName, customerPhone);
            const rs = await Customer.selectCustomer(customerName, customerPhone);
            const allBooks = await Book.selectAllBooks();
            const customer = {
                name: customerName,
                phone: customerPhone
            }
            if (rs.length > 0){
                // console.log(1);
                res.render("bill", {
                    checkCustomer: 1,
                    customer: rs[0],
                    allBooks: allBooks
                });
            } else {
                // console.log(0);
                res.render("bill", {
                    checkCustomer: 0,
                    customer: customer,
                    allBooks: allBooks
                });
            }
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
}

module.exports = new billC;
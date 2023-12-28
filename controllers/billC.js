const Bill = require("../models/bill");
const Customer = require("../models/customer");
const Book = require("../models/book");


class billC {
    async pageCreate(req, res) {
        try {
            res.render("bill", {
                session: 1, 
                userSession: req.session.passport.user,
                checkCustomer: 2,
                customer: {},
                msg: 0
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
                if (rs[0].No > 20000) {
                    res.render("bill", {
                        checkCustomer: 2,
                        msg: 1
                    });
                }
                else {
                    // console.log(1);
                    res.render("bill", {
                        checkCustomer: 1,
                        customer: rs[0],
                        allBooks: allBooks
                    });
                }
                
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
    async pay(req, res) {
        try {
            const data = req.body.data;
            const customerID = data.customer.customerID;
            const books = data.books;
            const date = data.date;
            const total = data.total;
            const customer = data.customer;
            console.log(data);
            console.log(customerID);
            
            if (customerID > 0) {
                const rs = await Bill.addBill(customerID, date, total);
                // console.log("id != 0");
            } else {
                customer = {...customer, no: 0}
                await Customer.insertCustomer(customer);
                let maxMaKH = 0;
                const allCustomer = await Customer.selectAllCustomers();
                allCustomer.forEach(customer => {
                    if (maxMaKH < customer.MaKH) {
                        maxMaKH = customer.MaKH;
                    }
                });
                await Bill.addBill(maxMaKH, date, total);
                console.log("id = 0");
            }

            res.send({
                msg: "succes"
            });

        } catch (error) {
            res.send({
                msg: "fail"
            });
        }
    }
    async debt(req, res) {
        try {
            const data = req.body.data;
            const customerID = data.customer.customerID;
            const books = data.books;
            const date = data.date;
            const total = data.total;
            const customer = data.customer;
            console.log(data);
            console.log(customerID);
            
            if (customerID > 0) {
                const rs = await Bill.addBill(customerID, date, total);
                const KH = await Customer.selectCustomerByID(customerID);
                const debt = KH[0].No + total;
                await Customer.updateDebt(customerID, debt);
                // console.log("id != 0");
            } else {
                customer = {...customer, no: total}
                await Customer.insertCustomer(customer);
                let maxMaKH = 0;
                const allCustomer = await Customer.selectAllCustomers();
                allCustomer.forEach(customer => {
                    if (maxMaKH < customer.MaKH) {
                        maxMaKH = customer.MaKH;
                    }
                });
                await Bill.addBill(maxMaKH, date, total);
                // console.log("id = 0");
            }

            res.send({
                msg: "success"
            });
            
        } catch (error) {
            res.send({
                msg: "fail"
            });
        }
    }
}

module.exports = new billC;
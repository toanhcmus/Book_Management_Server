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
            console.log("here")
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
                        customer: {},
                        msg: 3
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
            const total = data.total;   // ->
            let ghino = 0;
            let customer = data.customer;
            // console.log(data);
            // console.log(customerID);

            for (let i = 0; i < books.length; i++) {
                const foundBook = await Book.selectBookByID(books[i].bookId);
                console.log("book: ", books[i]);
                console.log(foundBook);
                let soLuongSau = foundBook[0].SoLuong - books[i].quantity;
                console.log(soLuongSau);
                if (soLuongSau < 20) {
                    console.log(books[i].quantity);
                    console.log(foundBook[0].SoLuong);
                    res.send({
                        msg: 0
                    });
                    return;
                }
            }
            
            if (customerID > 0) {
                const rs = await Bill.addBill(customerID, date, total, ghino);
                //console.log("id != 0");
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
                await Bill.addBill(maxMaKH, date, total,ghino);
                //console.log("id = 0");
            }

            let maxMaHD = 0;
            const allBill = await Bill.selectAllBills();
            allBill.forEach(bill => {
                if (maxMaHD < bill.MaHoaDon) {
                    maxMaHD = bill.MaHoaDon;
                }
            });

            for (let i = 0; i< books.length; i++) {
                await Book.updateBookByID(books[i].bookId, books[i].quantity);
                await Bill.addTTHoaDon(maxMaHD, books[i]);
            }

            res.send({
                msg: 1
            });

        } catch (error) {
            console.log(error);
            res.send({
                msg: 0
            });
            return;
        }
    }
    async debt(req, res) {
        try {
            const data = req.body.data;
            const customerID = data.customer.customerID;
            const books = data.books;
            const date = data.date;
            const total = data.total;   // ->
            let ghino = 1;
            let customer = data.customer;
            // console.log(data);
            // console.log(customerID);
            for (let i = 0; i < books.length; i++) {
                const foundBook = await Book.selectBookByID(books[i].bookId);
                console.log("book: ", books[i]);
                console.log(foundBook);
                let soLuongSau = foundBook[0].SoLuong - books[i].quantity;
                console.log(soLuongSau);
                if (soLuongSau < 20) {
                    console.log(books[i].quantity);
                    console.log(foundBook[0].SoLuong);
                    res.send({
                        msg: 0
                    });
                    return;
                }
            }
            
            if (customerID > 0) {
                const rs = await Bill.addBill(customerID, date, total, ghino);
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
                await Bill.addBill(maxMaKH, date, total, ghino);
                // console.log("id = 0");
            }

            let maxMaHD = 0;
            const allBill = await Bill.selectAllBills();
            allBill.forEach(bill => {
                if (maxMaHD < bill.MaHoaDon) {
                    maxMaHD = bill.MaHoaDon;
                }
            });

            for (let i = 0; i< books.length; i++) {
                await Book.updateBookByID(books[i].bookId, books[i].quantity);
                
            }

            res.send({
                msg: 1
            });
            
        } catch (error) {
            res.send({
                msg: 0
            });
            return;
        }
    }
}

module.exports = new billC;
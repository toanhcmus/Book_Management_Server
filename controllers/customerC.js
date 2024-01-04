const Customer = require("../models/customer")

class customerC {
    async pageCustomer(req, res) {
        try {
            const allCustomers = await Customer.selectAllCustomers();
            return res.render("customer", {
                allCustomers: allCustomers
            });
        } catch (error) {
            return res.render("500", {error: error.stack});
        }
    }
    async checkCustomer(req, res) {
        try {
            const name = req.body.customerName;
            const phone = req.body.customerPhone;
            console.log(name, phone);
            res.redirect(`/bill/name=${name}&phone=${phone}`);
            // const customer = {
            //     name: name,
            //     phone: phone
            // }
            // if (rs.length > 0){
            //     console.log(1);
            //     return res.render("bill", {
            //         checkCustomer: 1,
            //         customer: rs[0]
            //     });
            // } else {
            //     console.log(0);
            //     return res.render("bill", {
            //         checkCustomer: 0,
            //         customer: customer 
            //     });
            // }
        } catch (error) {
            return res.render("500", {error: error.stack});
        }
    }
    async debtcash(req, res) {
        try {
            console.log(req.body);
            const id = req.body.MaKH;
            const debt = req.body.SoTienThu;
            const date = req.body.NgayThu;

            await Customer.updateDebtCash(id, debt);
            await Customer.insertDebt(id, debt, date);

            console.log("da insert vao phieu thu tien");
            
        } catch (error) {
            return res.send({
                msg: 0
            })
        }
        return res.send({
            msg: 1
        })
    }
}

module.exports = new customerC;
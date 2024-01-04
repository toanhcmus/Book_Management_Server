const Customer = require("../models/customer")
const Rule = require('../models/rules');

class customerC {
    async pageCustomer(req, res) {
        try {
            const checkQD = await Rule.getApDungQuyDinh4();
            console.log(checkQD);
            const allCustomers = await Customer.selectAllCustomers();
            return res.render("customer", {
                allCustomers: allCustomers,
                checkQD: checkQD.ApDungQuyDinh4
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
            try {
                await Customer.updateDebtCash(id, debt);
                await Customer.insertDebt(id, debt, date);
            } catch (error) {
                return res.send({
                    msg: 0
                });
            }

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
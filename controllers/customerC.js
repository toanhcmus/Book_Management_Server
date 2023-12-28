const Customer = require("../models/customer")

class customerC {
    async pageCustomer(req, res) {
        try {
            
        } catch (error) {
            res.render("500", {error: error.stack});
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
            //     res.render("bill", {
            //         checkCustomer: 1,
            //         customer: rs[0]
            //     });
            // } else {
            //     console.log(0);
            //     res.render("bill", {
            //         checkCustomer: 0,
            //         customer: customer 
            //     });
            // }
            
        } catch (error) {
            
        }
    }
}

module.exports = new customerC;
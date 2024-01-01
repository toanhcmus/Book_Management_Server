const Rules = require("../models/rules");

class rulesC {
    async pageRules(req, res) {
        try {
            const rules = await Rules.getRules();
            res.render("rules", {rules: rules});
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }

    async rulesAlteration(req, res) {
        try {
            console.log(req.body);
            const val1 = parseInt(req.body.val1);
            const val2 = parseInt(req.body.val2);
            const val3 = parseInt(req.body.val3);
            const val4 = parseInt(req.body.val4);
            const val5 = parseInt(req.body.val5);

            await Rules.updateRules(val1, val2, val3, val4, val5);
            
        } catch (error) {
            res.send({
                msg: 0
            });

            return;
        }
        res.send({
            msg: 1
        })
    }
}

module.exports = new rulesC;
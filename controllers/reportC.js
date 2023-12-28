class reportC {
    async page(req, res) {
        try {
            res.render("report", {

            });
        } catch (error) {
            res.render("500", { error: error.stack });
        }
    }

}

module.exports = new reportC();


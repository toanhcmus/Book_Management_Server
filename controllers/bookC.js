const Book = require("../models/book")

class bookC {
    async pageImport(req, res) {
        // let id = req.params.id;
        // const proDetail = await Product.selectProductByID(id);
        const allBooks = await Book.selectAllBooks();
        try {
            res.render("importBook", {
                session: 1, 
                userSession: req.session.passport.user,
                books: allBooks
            });
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }

    async importBook(req, res) {
        console.log(req.body);
        const dataImport = req.body.data;

        for (let i = 0; i < dataImport.length; i++) {
            try {
                const rs = await Book.selectBook(dataImport[i].TenSach);
                // console.log(rs);
                if (rs.length > 0) {
                    console.log(dataImport[i].SoLuong);
                    console.log(rs[0].SoLuong);
                    let soluongmoi = parseInt(dataImport[i].SoLuong) + parseInt(rs[0].SoLuong);
                    console.log(soluongmoi);
                    await Book.updateBook(dataImport[i].TenSach, soluongmoi)
                } else {
                    await Book.importBook(dataImport[i]);
                }
            } catch(err) {
                res.send({
                    msg: 'fail'
                });
            }
        }
        res.send({
            msg: 'success'
        });
    }
}

module.exports = new bookC;
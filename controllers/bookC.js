const Book = require("../models/book")
const Rule = require("../models/rules");

class bookC {
    async pageImport(req, res) {
        // let id = req.params.id;
        // const proDetail = await Product.selectProductByID(id);
        const allBooks = await Book.selectAllBooks();
        const soLuongNhapItNhat = await Rule.getSoLuongNhapItNhat();
        const SoLuongTonToiDaKhiNhap = await Rule.getSoLuongTonToiDaKhiNhap();
        console.log(soLuongNhapItNhat);
        try {
            return res.render("importBook", {
                session: 1, 
                userSession: req.session.passport.user,
                books: allBooks,
                soLuongNhapItNhat: soLuongNhapItNhat.SoLuongNhapItNhat,
                SoLuongTonToiDaKhiNhap: SoLuongTonToiDaKhiNhap.SoLuongTonToiDaKhiNhap
            });
        } catch (error) {
            return res.render("500", {error: error.stack});
        }
    }

    async importBook(req, res) {
        // console.log(req.body);
        const dataImport = req.body.data;
        const date = req.body.date;

        await Book.addDonNhapSach(date);

        for (let i = 0; i < dataImport.length; i++) {
            try {
                const rs = await Book.selectBook(dataImport[i].TenSach);
                // console.log(rs);
                if (rs.length > 0) {
                    // console.log(dataImport[i].SoLuong);
                    // console.log(rs[0].SoLuong);
                    let soluongmoi = parseInt(dataImport[i].SoLuong) + parseInt(rs[0].SoLuong);
                    // console.log(soluongmoi);
                    await Book.updateBook(dataImport[i].TenSach, soluongmoi)
                } else {
                    await Book.importBook(dataImport[i]);
                }
            } catch(err) {
                return res.send({
                    msg: 0
                });
            }
        }

        let maxMaDonNS = 0;
        const donNS = await Book.selectAllDonNhapSach();
        for (let j = 0; j < donNS.length; j++) {
            if (donNS[j].MaDonNS > maxMaDonNS) {
                maxMaDonNS = donNS[j].MaDonNS;
            }
        }

        for (let i = 0; i < dataImport.length; i++) {
            const rs = await Book.selectBook(dataImport[i].TenSach);
            const obj = {
                MaDonNS: maxMaDonNS,
                MaSach: rs[0].MaSach,
                SoLuong: dataImport[i].SoLuong,
                DonGia: dataImport[i].Gia
            }
            await Book.addThongTinNhapSach(obj);
        }

        return res.send({
            msg: 1
        });
    }

    async pageSearch(req, res) {
        const allBooks = await Book.selectAllBooks();
        try {
            return res.render("bookSearch", {
                session: 1, 
                userSession: req.session.passport.user,
                books: allBooks
            });
        } catch (error) {
            return res.render("500", {error: error.stack});
        }
    }

    async searchBook(req, res) {
        const search = req.body.inputSearch;
        const allBooks = await Book.searchBook(search);
        // console.log(allBooks);
        try {
            return res.render("bookSearch", {
                session: 1, 
                userSession: req.session.passport.user,
                books: allBooks
            });
        } catch (error) {
            return res.render("500", {error: error.stack});
        }
    }
}

module.exports = new bookC;
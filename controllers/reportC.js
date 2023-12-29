const Book = require('../models/book');
const HoaDon = require('../models/bill');
class reportC {
    async pageReport(req, res) {
        try {
            res.render("report", {
                empty: false,
                allBooks: [],
                option: 0
            });
        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
    async inventoryReport(req, res) {
        try {
            // console.log(req.body);
            const option = parseInt(req.body.optionReport);
            const month = parseInt(req.body.month);
            const year = parseInt(req.body.year);

            function getPreviousMonthLastDay(year, month) {
                // Lấy tháng hiện tại
                const currentMonth = month;

                // Lấy năm hiện tại
                const currentYear = year;

                // Lấy tháng trước
                const previousMonth = currentMonth - 1;

                // Lấy năm của tháng trước
                const previousYear = currentYear;

                let current = new Date(previousYear, previousMonth, 0);
                current.setDate(current.getDate() + 1);

                // Trả về ngày cuối cùng của tháng trước
                return current.toISOString().split('T')[0];
            }
            
            let result = getPreviousMonthLastDay(year, month);
            console.log(result);
              
            if (option === 1) {
                // nhap sach trong thang nay
                const donNhapSach = await Book.selectDonNhapSach(month, year);
                // hoa don trong thang nay
                const hoadon = await HoaDon.selectHoaDon(month, year);
                // lay het sach co trong kho
                let allBooks = await Book.selectAllBooks();
                // lay nhung don sach tu truoc den truoc thang nay
                let donNhapSachTuTruoc = await Book.selectTTDonNhapSachBN(result);
                // lay nhung hoa don tu truoc den truoc thang nay
                let hoadonTuTruoc = await HoaDon.selectTTThoaDonBD(result);

                for (let i = 0; i < allBooks.length; i++) {
                    allBooks[i] = {...allBooks[i], TonDau: 0, TonCuoi: 0, Nhap: 0, Ban: 0, PhatSinh: 0};
                }
                console.log("donNSTT: ",donNhapSachTuTruoc);
                console.log("HDTT: ", hoadonTuTruoc);
                for (let i=0; i < donNhapSachTuTruoc.length; i++) {
                    let index = allBooks.findIndex((book) => {
                        return book.MaSach === donNhapSachTuTruoc[i].MaSach;
                    });
                    allBooks[index].TonDau += donNhapSachTuTruoc[i].SoLuong;
                }

                for (let i = 0; i < donNhapSach.length; i++) {
                    const dsTTDonNhapSach = await Book.selectThongTinNhapSach(donNhapSach[i].MaDonNS);
                    for (let j = 0; j < dsTTDonNhapSach.length; j++) {
                        // console.log("TTNS:", dsTTDonNhapSach[j].MaSach);
                        let index = allBooks.findIndex((book) => {
                            return book.MaSach === dsTTDonNhapSach[j].MaSach;
                        });
                        // console.log("index = ", index);
                        allBooks[index].Nhap += dsTTDonNhapSach[j].SoLuong;
                    }
                }
                // console.log(allBooks);

                for (let i=0; i < hoadonTuTruoc.length; i++) {
                    let index = allBooks.findIndex((book) => {
                        return book.MaSach === hoadonTuTruoc[i].MaSach;
                    });
                    allBooks[index].TonDau -= hoadonTuTruoc[i].SoLuong;
                }

                console.log("HD:", hoadon);

                for (let i = 0; i < hoadon.length; i++) {
                    const hdTT = await HoaDon.selectTTHoaDon(hoadon[i].MaHoaDon);
                    console.log("HdTT", hdTT);
                    for (let j = 0; j < hdTT.length; j++) {
                        // console.log("TTNS:", dsTTDonNhapSach[j].MaSach);
                        let index = allBooks.findIndex((book) => {
                            return book.MaSach === hdTT[j].MaSach;
                        });
                        // console.log("index = ", index);
                        allBooks[index].Ban += hdTT[j].SoLuong;
                    }
                }
                for (let i = 0; i < allBooks.length; i++) {
                    allBooks[i].PhatSinh = allBooks[i].Nhap - allBooks[i].Ban;
                    allBooks[i].TonCuoi = allBooks[i].TonDau + allBooks[i].PhatSinh;
                }
                console.log(allBooks);
                let hasEmpty = true;
                // for (let i = 0; i < allBooks.length; i++) {
                //     if (allBooks[i].TonDau <= allBooks[i].TonCuoi) {
                //         hasEmpty = true;
                //     }
                // }

                // allBooks = {...allBooks, month: month, year: year};

                let data = {
                    books: allBooks,
                    month: month, 
                    year: year
                }

                res.render("report", {
                    empty: hasEmpty,
                    allBooks: data,
                    option: 1
                })

            }

        } catch (error) {
            res.render("500", {error: error.stack});
        }
    }
}

module.exports = new reportC;
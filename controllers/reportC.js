const Book = require("../models/book");
const HoaDon = require("../models/bill");
const PhieuThuTien = require("../models/customer");
const Customer = require("../models/customer");

class reportC {
  async pageReport(req, res) {
    try {
      return res.render("report", {
        empty: false,
        allBooks: [],
        option: 0,
      });
    } catch (error) {
      return res.render("500", { error: error.stack });
    }
  }
  async report(req, res) {
    ///
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
        return current.toISOString().split("T")[0];
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
          allBooks[i] = {
            ...allBooks[i],
            TonDau: 0,
            TonCuoi: 0,
            Nhap: 0,
            Ban: 0,
            PhatSinh: 0,
          };
        }
        console.log("donNSTT: ", donNhapSachTuTruoc);
        console.log("HDTT: ", hoadonTuTruoc);
        for (let i = 0; i < donNhapSachTuTruoc.length; i++) {
          let index = allBooks.findIndex((book) => {
            return book.MaSach === donNhapSachTuTruoc[i].MaSach;
          });
          allBooks[index].TonDau += donNhapSachTuTruoc[i].SoLuong;
        }

        for (let i = 0; i < donNhapSach.length; i++) {
          const dsTTDonNhapSach = await Book.selectThongTinNhapSach(
            donNhapSach[i].MaDonNS
          );
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

        for (let i = 0; i < hoadonTuTruoc.length; i++) {
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

        let allValidBooks = [];

        allBooks.forEach(book => {
          if (book.TonDau !== 0 || book.TonCuoi !== 0 || book.PhatSinh !== 0) {
            hasEmpty = false;
            allValidBooks.push(book);
          }
        })

        let data = {
          books: allValidBooks,
          month: month,
          year: year,
        };

        return res.render("report", {
          empty: hasEmpty,
          allBooks: data,
          option: 1,
        });
      }

      if (option === 2) {
        // LAY ALL BILL MA THU NO THANG NAY
        const HDThuNo = await HoaDon.selectHoaDonGN(month, year);
        console.log(HDThuNo)
        // lay ALL PHIEU THU NO THANG NAY
        const PTN = await PhieuThuTien.selectDebt(month, year);
        console.log(PTN);
        // lay HET KHACH HANG
        let allCustomers = await Customer.selectAllCustomers();

        // LAY ALL HOA DON GHI NO TU TRUOC DEN TRUOC THANG NAY
        let HDThuNoTuTruoc = await HoaDon.selectHoaDonGNTuTruoc(result);
        console.log(HDThuNoTuTruoc);
        // lay ALL PHIEU THU NO TU TRUOC DEN THANG NAY
        const PTNTuTruoc = await PhieuThuTien.selectDebtTuTruoc(result);
        console.log(PTNTuTruoc);
        for (let i = 0; i < allCustomers.length; i++) {
          allCustomers[i] = {
              ...allCustomers[i],
              SDT: allCustomers[i].SDT,
            NoDau: 0,
            NoCuoi: 0,
            No: 0,
            Tra: 0,
            PhatSinh: 0,
          };
        }

 /////////////////////////////////////////////////// STOP HERE///////////////////////////////////////////
        
    for (let i = 0; i < HDThuNoTuTruoc.length; i++) {   // oke
      let index = allCustomers.findIndex((customer) => {
        return customer.MaKH === HDThuNoTuTruoc[i].KhachHang;
      });
        allCustomers[index].NoDau += HDThuNoTuTruoc[i].ThanhTien;

        // console.log("no tu truoc")
        // console.log(allCustomers[index].NoDau, allCustomers);
        // console.log("no tu truoc");

    }

    for (let i = 0; i < PTN.length; i++) {  // may be oke
      let index = allCustomers.findIndex((customer) => {
        return customer.MaKH === PTN[i].KhachHang;
      });
        console.log("so tien tra trong thang nay");
        allCustomers[index].Tra += PTN[i].SoTienThu;
        console.log("so tien tra trong thang nay");
    }


    for (let i = 0; i < PTNTuTruoc.length; i++) {   // oke
      let index = allCustomers.findIndex((customer) => {
        return customer.MaKH === PTNTuTruoc[i].KhachHang;
      });
        allCustomers[index].NoDau -= PTNTuTruoc[i].SoTienThu;
        // console.log("Sau khi tra no all thang truoc");
        // console.log(allCustomers[index].NoDau)
        // console.log("Sau khi tra no all thang truoc")
    }

    for (let i = 0; i < HDThuNo.length; i++) {
      let index = allCustomers.findIndex((customer) => {
        return customer.MaKH === HDThuNo[i].KhachHang;
      });
        console.log("So tien no trong thang nay")
        allCustomers[index].No += HDThuNo[i].ThanhTien;
        console.log("So tien no trong thang nay");
    }

    for (let i = 0; i < allCustomers.length; i++) {
      allCustomers[i].PhatSinh = allCustomers[i].No - allCustomers[i].Tra;
      allCustomers[i].NoCuoi = allCustomers[i].NoDau + allCustomers[i].PhatSinh;
    }

        console.log(allCustomers);
        let hasEmpty = true;

        let allValidCustomers = [];

        allCustomers.forEach(customer => {
          if (customer.PhatSinh !== 0 || customer.NoCuoi !== 0 || customer.NoDau !== 0) {
            hasEmpty = false;
            allValidCustomers.push(customer);         
          }
        })

        let data = {
          customers: allValidCustomers,
          month: month,
          year: year,
        };
        return res.render("report", {
          empty: hasEmpty,
          allCustomers: data,
          option: 2,
        });
      }
    } catch (error) {
      return res.render("500", { error: error.stack });
    }
  }
}

module.exports = new reportC();

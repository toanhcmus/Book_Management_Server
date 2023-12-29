const db = require('../config/connectDB');

module.exports = {
    selectAllBills: async () => {
        const rs = await db.any('SELECT * FROM public."HoaDon"');
        return rs;
    },
    addBillDebt: async (obj) => {

    },
    addBillPay: async (obj) => {

    },
    addTTHoaDon: async (MaHoaDon, obj) => {
        try {
            await db.one('INSERT INTO public."ThongTinHoaDon"("MaHoaDon", "MaSach", "SoLuong") VALUES ($1, $2, $3)', [MaHoaDon, obj.bookId, obj.quantity]);
        } catch (error) {
            console.error('Error inserting:', error);
            throw error;
        }
    },
    addBill: async (MaKH, date, total) => {
        try {
            const rs = await db.none('INSERT INTO public."HoaDon"("KhachHang", "NgayLap", "ThanhTien") VALUES ($1, $2, $3)', [MaKH, date, total]);
            // console.log(MaKH, date, total);
            return rs;
        } catch (error) {
            console.error('Error inserting:', error);
            throw error;
        }
    },
    insertBill: async (obj) => {
        try {
            await db.one('INSERT INTO "HoaDon"("KhachHang", "NgayLap", "ThanhTien") VALUES($1, $2, $3)', [obj.makh, obj.date, obj.total]);
        } catch (err) {
            console.log("insert bill failed");
        }
    },
    selectHoaDon: async (month, year) => {
        const rs = await db.any('SELECT * FROM "HoaDon" WHERE EXTRACT(YEAR FROM "NgayLap") = $1 AND EXTRACT(MONTH FROM "NgayLap") = $2;', [year, month]);
        return rs;
    },
    selectTTHoaDon: async (MaHD) => {
        const rs = await db.any('SELECT * FROM "ThongTinHoaDon" WHERE "MaHoaDon" = $1;', [MaHD]);
        return rs;
    },
    selectTTThoaDonBD: async (date) => {
        const rs = await db.any(`select * from "HoaDon" JOIN "ThongTinHoaDon" 
        on "HoaDon"."MaHoaDon" = "ThongTinHoaDon"."MaHoaDon" WHERE "NgayLap" <= $1 ORDER BY "MaThongTinHD" ASC;`, [date]);
        return rs;
    }
}
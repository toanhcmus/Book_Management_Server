const db = require('../config/connectDB');

module.exports = {
    importBook: async(obj) => {
        try {
            await db.none('INSERT INTO public."Sach"("TenSach", "TacGia", "Gia", "TheLoai", "SoLuong") VALUES ($1, $2, $3, $4, $5)', [obj.TenSach, obj.TacGia, obj.Gia, obj.TheLoai, obj.SoLuong]);
        } catch (error) {
            console.error('Error inserting:', error);
            throw error;
        }
    },
    selectAllBooks: async() => {
        const rs = await db.any('SELECT * FROM public."Sach"');
        return rs;
    },
    selectBook: async(name) => {
        const rs = await db.any('SELECT * FROM public."Sach" WHERE lower("TenSach") ILIKE $1', [`%${name.toLowerCase()}%`]);
        // console.log(rs);
        return rs;
    },
    selectBookByID: async(id) => {
        const rs = await db.any('SELECT * FROM public."Sach" WHERE "MaSach" = $1', [id]);
        // console.log(rs);
        return rs;
    },
    updateBook: async(TenSach, SoLuong) => {
        const updateQuery = 'UPDATE public."Sach" SET "SoLuong" = $1 WHERE lower("TenSach") = lower($2)';
        await db.none(updateQuery, [SoLuong, TenSach]);
    },
    updateBookByID: async(id, SoLuong) => {
        const updateQuery = 'UPDATE public."Sach" SET "SoLuong" = "SoLuong" - $1 WHERE "MaSach" = $2';
        await db.none(updateQuery, [SoLuong, id]);
    },
    searchBook: async(name) => {
        const rs = await db.any('SELECT * FROM public."Sach" WHERE lower("TenSach" || "TacGia" || "TheLoai") LIKE $1', [`%${name.toLowerCase()}%`]);
        // console.log(rs);
        return rs;
    },
    addDonNhapSach: async (date) => {
        await db.none('INSERT INTO public."DonNhapSach"("NgayNhap") VALUES ($1)', [date]);
    },
    selectAllDonNhapSach: async () => {
        const rs = await db.any('SELECT * FROM public."DonNhapSach"');
        return rs;
    },
    addThongTinNhapSach: async(obj) => {
        await db.none('INSERT INTO public."ThongTinNhapSach"("MaDonNS", "MaSach", "SoLuong", "DonGia") VALUES ($1, $2, $3, $4)', [obj.MaDonNS, obj.MaSach, obj.SoLuong, obj.DonGia]);
    },
    selectDonNhapSach: async(month, year) => {
        const rs = await db.any('SELECT * FROM "DonNhapSach" WHERE EXTRACT(YEAR FROM "NgayNhap") = $1 AND EXTRACT(MONTH FROM "NgayNhap") = $2;', [year, month]);
        return rs;
    },
    selectThongTinNhapSach: async(MaDonNS) => {
        const rs = await db.any('SELECT * FROM "ThongTinNhapSach" WHERE "MaDonNS" = $1;', [MaDonNS]);
        return rs;
    },
    selectTTDonNhapSachBN: async(date) => {
        const rs = await db.any(`SELECT * FROM "DonNhapSach" JOIN "ThongTinNhapSach" 
        ON "DonNhapSach"."MaDonNS" = "ThongTinNhapSach"."MaDonNS" WHERE "NgayNhap" <= $1 ORDER BY "MaThongTinNS" ASC`, [date]);
        return rs;
    }
}
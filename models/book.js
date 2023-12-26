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
        console.log(rs);
        return rs;
    },
    updateBook: async(TenSach, SoLuong) => {
        const updateQuery = 'UPDATE public."Sach" SET "SoLuong" = $1 WHERE lower("TenSach") = lower($2)';
        await db.none(updateQuery, [SoLuong, TenSach]);
    }
}
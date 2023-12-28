const db = require('../config/connectDB');

module.exports = {
    selectCustomer: async (name, sdt) => {
        const rs = await db.any('SELECT * FROM public."KhachHang" WHERE lower("TenKH") ILIKE $1 AND "SDT" LIKE $2', [`%${name.toLowerCase()}%`, sdt]);
        console.log(rs);
        return rs;
    }
}
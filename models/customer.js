const db = require('../config/connectDB');

module.exports = {
    selectCustomer: async (name, sdt) => {
        const rs = await db.any('SELECT * FROM public."KhachHang" WHERE lower("TenKH") ILIKE $1 AND "SDT" LIKE $2', [`%${name.toLowerCase()}%`, sdt]);
        console.log(rs);
        return rs;
    },
    selectCustomerByID: async (id) => {
        const rs = await db.any('SELECT * FROM public."KhachHang" WHERE "MaKH" = $1', [id]);
        // console.log(rs);
        return rs;
    },
    insertCustomer: async (obj) => {
        await db.one(`INSERT 
                        INTO public."KhachHang"("TenKH", "DiaChi", "Email", "SDT", "No") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [obj.customerName, obj.customerAddress, obj.customerEmail, obj.customerPhone, obj.no]);
    },
    selectAllCustomers: async () => {
        const rs = await db.any('SELECT * FROM public."KhachHang"');
        return rs;
    },
    updateDebt: async(id, debt) => {
        const updateQuery = 'UPDATE public."KhachHang" SET "No" = $1 WHERE "MaKH" = $2';
        await db.none(updateQuery, [debt, id]);
    },
    updateDebtCash: async(id, debt) => {
        const updateQuery = 'UPDATE public."KhachHang" SET "No" = "No" - $1 WHERE "MaKH" = $2';
        await db.none(updateQuery, [debt, id]);
    }
}
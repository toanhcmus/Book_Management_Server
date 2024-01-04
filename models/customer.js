const db = require("../config/connectDB");

module.exports = {
  selectCustomer: async (name, sdt) => {
    const rs = await db.any(
      'SELECT * FROM public."KhachHang" WHERE lower("TenKH") ILIKE $1 AND "SDT" LIKE $2',
      [`%${name.toLowerCase()}%`, sdt]
    );
    console.log(rs);
    return rs;
  },
  selectCustomerByID: async (id) => {
    const rs = await db.any(
      'SELECT * FROM public."KhachHang" WHERE "MaKH" = $1',
      [id]
    );
    // console.log(rs);
    return rs;
  },
  insertCustomer: async (obj) => {
    await db.one(
      `INSERT INTO public."KhachHang"("TenKH", "DiaChi", "Email", "SDT", "No") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        obj.customerName,
        obj.customerAddress,
        obj.customerEmail,
        obj.customerPhone,
        obj.no,
      ]
    );
  },
  selectAllCustomers: async () => {
    const rs = await db.any('SELECT * FROM public."KhachHang"');
    return rs;
  },
  updateDebt: async (id, debt) => {
    const updateQuery =
      'UPDATE public."KhachHang" SET "No" = $1 WHERE "MaKH" = $2';
    await db.none(updateQuery, [debt, id]);
  },
  updateDebtCash: async (id, debt) => {
    const updateQuery =
      'UPDATE public."KhachHang" SET "No" = "No" - $1 WHERE "MaKH" = $2';
    if (debt !== null) {
      await db.none(updateQuery, [debt, id]);
    }
  },

  // insert vao Phieu thu tien
  insertDebt: async (id, debt, date) => {
    try {
      const rs = await db.none(
        'INSERT INTO public."PhieuThuTien"("KhachHang", "SoTienThu", "NgayThuTien") VALUES ($1, $2, $3)',
        [id, debt, date]
      );
      return rs;
    } catch (error) {
      console.error("Error inserting:", error);
      throw error;
    }
    },
  
    selectDebt: async (month, year) => {
        const rs = await db.any(
            'SELECT * FROM "PhieuThuTien" WHERE  EXTRACT(YEAR FROM "NgayThuTien") = $1 AND EXTRACT(MONTH FROM "NgayThuTien") = $2',
            [year, month]
        );
        return rs;
    },

    selectDebtTuTruoc: async (date) => {
    const rs = await db.any(
      'SELECT * FROM "PhieuThuTien" WHERE  "NgayThuTien" <= $1',[date]
    );
    return rs;
    }

  // insert vao Bao Cao Cong no
//   insertCustomer: async (obj) => {
//     await db.one(
//       `INSERT 
//                         INTO public."KhachHang"("TenKH", "DiaChi", "Email", "SDT", "No") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [
//         obj.customerName,
//         obj.customerAddress,
//         obj.customerEmail,
//         obj.customerPhone,
//         obj.no,
//       ]
//     );
//   },
};

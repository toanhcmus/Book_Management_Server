const db = require('../config/connectDB');

module.exports = {
    getRules: async() => {
        const rs = await db.any('SELECT * FROM public."QuyDinh"');
        return rs;
    },
    getSoLuongNhapItNhat: async() => {
        const rs = await db.any('SELECT "SoLuongNhapItNhat" FROM public."QuyDinh"');
        return rs[0];
    },
    getSoLuongTonToiDaKhiNhap: async() => {
        const rs = await db.any('select "SoLuongTonToiDaKhiNhap" from "QuyDinh"');
        return rs[0];
    },
    getNoToiDa: async() => {
        const rs = await db.any('select "NoToiDa" from "QuyDinh"');
        return rs;
    },
    getTonSauToiThieu: async() => {
        const rs = await db.any('select "TonSauToiThieu" from "QuyDinh"');
        return rs;
    },
    getApDungQuyDinh4: async() => {
        const rs = await db.any('select "ApDungQuyDinh4" from "QuyDinh"');
        return rs;
    },
    updateRules: async(val1, val2, val3, val4, val5) => {
        const updateQuery1 = 'UPDATE public."QuyDinh" SET "SoLuongNhapItNhat" = $1';
        await db.none(updateQuery1, val1);
        const updateQuery2 = 'UPDATE public."QuyDinh" SET "SoLuongTonToiDaKhiNhap" = $1';
        await db.none(updateQuery2, val2);

        const updateQuery3 = 'UPDATE public."QuyDinh" SET "NoToiDa" = $1';
        await db.none(updateQuery3, val3);
        const updateQuery4 = 'UPDATE public."QuyDinh" SET "TonSauToiThieu" = $1';
        await db.none(updateQuery4, val4);

        const updateQuery5 = 'UPDATE public."QuyDinh" SET "ApDungQuyDinh4" = $1';
        await db.none(updateQuery5, val5);
    },
}
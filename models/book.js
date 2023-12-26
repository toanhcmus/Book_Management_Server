const db = require('../config/connectDB');

module.exports = {
    importBook: async(obj) => {
        try {
            // const rs = await db.none('INSERT INTO public."Products"("ProID", "ProName", "TinyDes", "FullDes", "Price", "CatID", "Quantity") VALUES ($1, $2, $3, $4, $5, $6, $7)', [newProID, obj.ProName, obj.TinyDes, obj.FullDes, obj.Price, id, obj.Quantity]);
            // return rs;
        } catch (error) {
            // console.error('Error inserting category:', error);
            // throw error;
        }
    }
    
}
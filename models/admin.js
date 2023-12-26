const db = require('../config/connectDB');

module.exports = {
    selectUser: async id => {
        const rs = await db.any('SELECT * FROM public."admin" WHERE "admin"."Username" = $1', [id]);
        return rs;
    },
    insertUser: async user => {
        const rs = await db.one(`INSERT 
                        INTO public."admin"("Username", "Password") VALUES ($1, $2) RETURNING *`, [user.username, user.password]);
        return rs;
    },
}
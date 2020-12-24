const UserDrinkServices = {
    getAllUserDrinks(knex) {
        return knex.select('*').from('tbl_user_drinks')
    },

    getById(knex, userdrinkid) {
        return knex.from('tbl_user_drinks').select('*').where('userdrinkid', userdrinkid)
    },

    getByUserId(knex, userid) {
        return knex.from('tbl_user_drinks').select('*').where('userid', userid)
    },

    getTodaysDrinksByUserId(knex, userid, start) {
        return knex.from('tbl_user_drinks')
            .select('*')
            .where('userid', userid)
            .where('userdrinktime', '>', start )
    },

    insertUserDrink(knex, newuserdrink) {
        return knex
            .insert(newuserdrink)
            .into('tbl_user_drinks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteUserDrink(knex, userdrinkid) {
        return knex('tbl_user_drinks')
            .where({ userdrinkid })
            .delete()
    },

    updateUserDrink(knex, userdrinkid, newuserdrinkfields) {
        return knex('tbl_user_drinks')
            .where({ userdrinkid })
            .update(newuserdrinkfields)
    },
}

module.exports = UserDrinkServices
const DrinkServices = {
    getAllDrinks(knex) {
        return knex.select('*').from('tbl_drinks')
    },

    getById(knex, drinkid) {
        return knex.from('tbl_drinks').select('*').where('drinkid', drinkid).first()
    },

    insertDrink(knex, newdrink) {
        return knex
            .insert(newdrink)
            .into('tbl_drinks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteDrink(knex, drinkid) {
        return knex('tbl_drinks')
            .where({ drinkid })
            .delete()
    },

    updateDrink(knex, drinkid, newdrinkfields) {
        return knex('tbl_drinks')
            .where({ drinkid })
            .update(newdrinkfields)
    },
}

module.exports = DrinkServices
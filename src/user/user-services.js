const UserServices = {
    getAllUsers(knex) {
        return knex.select('*').from('tbl_users')
    },

    getById(knex, userid) {
        return knex.from('tbl_users').select('*').where('userid', userid).first()
    },

    getByUserPhone(knex, userphone, userpin) {
        return knex.from('tbl_users').select('*').where('userphone', userphone).where('userpin', userpin)
    },

    insertUser(knex, newuser) {
        if (!this.getByUserPhone(knex, newuser.userphone)) {
            return knex
                .insert(newuser)
                .into('tbl_users')
                .returning('*')
                .then(rows => {
                    return rows[0]
                })
        }
        else {
            throw Error("Phonenumber is alread in use");
        }
    },

    deleteUser(knex, userid) {
        return knex('tbl_users')
            .where({ userid })
            .delete()
    },

    updateUser(knex, userid, newuserfields) {
        return knex('tbl_users')
            .where({ userid })
            .update(newuserfields)
    },
}

module.exports = UserServices
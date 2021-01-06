const UserGuardianServices = {

    getAllUserGuardians(knex) {
        return knex.select('*').from('tbl_user_guardians')
    },

    getById(knex, userguardiansid) {
        return knex.from('tbl_user_guardians').select('*').where('userguardiansid', userguardiansid).first()
    },

    getByUserId(knex, userid) {
        return knex.from('tbl_user_guardians').select('*').where('userid', userid).first()
    },

    insertUserGuardian(knex, newuserguardian) {
        return knex
            .insert(newuserguardian)
            .into('tbl_user_guardians')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteUserGuardian(knex, userguardiansid) {
        return knex('tbl_user_guardians')
            .where({ userguardiansid })
            .delete()
    },

    updateUserGuardian(knex, userguardiansid, newuserguardianfields) {
        return knex('tbl_user_guardians')
            .where({ userguardiansid })
            .update(newuserguardianfields)
    },
}

module.exports = UserGuardianServices
const UserGuardianServices = {

    getAllUserGuardians(knex) {
        return knex.select('*').from('tbl_user_guardians')
    },

    getById(knex, userguardianid) {
        return knex.from('tbl_user_guardians').select('*').where('userguardianid', userguardianid).first()
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

    deleteUserGuardian(knex, userguardianid) {
        return knex('tbl_user_guardians')
            .where({ userguardianid })
            .delete()
    },

    updateUserGuardian(knex, userguardianid, newuserguardianfields) {
        return knex('tbl_user_guardians')
            .where({ userguardianid })
            .update(newuserguardianfields)
    },
}

module.exports = UserGuardianServices
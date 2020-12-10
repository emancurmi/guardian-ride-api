var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'myapp_test'
    }
});

const UserGuardianServices = {

    getAllUserGuardians() {
        return knex.select('*').from('tbl_user_guardians')
    },

    getById(userguardianid) {
        return knex.from('tbl_user_guardians').select('*').where('userguardianid', userguardianid).first()
    },

    getByUserId(userid) {
        return knex.from('tbl_user_guardians').select('*').where('userid', userid).first()
    },

    insertUserGuardian(newuserguardian) {
        return knex
            .insert(newuserguardian)
            .into('tbl_user_guardians')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteUserGuardian(userguardianid) {
        return knex('tbl_user_guardians')
            .where({ userguardianid })
            .delete()
    },

    updateUserGuardian(userguardianid, newuserguardianfields) {
        return knex('tbl_user_guardians')
            .where({ userguardianid })
            .update(newuserguardianfields)
    },
}

module.exports = UserGuardianServices
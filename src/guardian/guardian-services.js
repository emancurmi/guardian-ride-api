const GuardianServices = {
    getAllGuardians(knex) {
        return knex.select('*').from('tbl_guardians')
    },

    getById(knex, guardianid) {
        return knex.from('tbl_guardians').select('*').where('guardianid', guardianid).first()
    },

    insertGuardian(knex, newguardian) {
        return knex
            .insert(newguardian)
            .into('tbl_guardians')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteGuardian(knex, guardianid) {
        return knex('tbl_guardians')
            .where({ guardianid })
            .delete()
    },

    updateGuardian(knex, guardianid, newguardianfields) {
        return knex('tbl_guardians')
            .where({ guardianid })
            .update(newguardianfields)
    },
}

module.exports = GuardianServices
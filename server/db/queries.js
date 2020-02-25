const knex = require('./knex')

module.exports = {
    getAllTeachers() {
        return knex('teacher')
    },
    getOneTeacher(id) {
        return knex('teacher').where('id', id).first()
    },
    createTeacher(teacher) {
        return knex('teacher').insert(teacher, '*')
    },
    updateTeacher(id, teacher) {
        return knex('teacher').where('id', id).update(teacher, '*')
    },
    deleteTeacher(id) {
        return knex('teacher').where('id', id).del()
    },

    getAllUsers() {
        return knex('user')
    },
    getOneUser(id) {
        return knex('user').where('id', id).first()
    },
    createUser(user) {
        return knex('user').insert(user, '*')
    },
    updateUser(id, user) {
        return knex('user').where('id', id).update(user, '*')
    },
    deleteUser(id) {
        return knex('user').where('id', id).del()
    },

    getAllTeacherUsers(id) {
        return knex('teacher_users').where('id', id)
    }
}


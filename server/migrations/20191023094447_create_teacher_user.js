
exports.up = function(knex) {
    return knex.schema.createTable('teacher_users', (table) => {
        table.increments()
        table.integer('teacher_id').references('teacher.id')
        table.integer('user_id').references('user.id')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('teacher_users')
};

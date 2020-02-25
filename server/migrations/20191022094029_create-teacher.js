
exports.up = function(knex) {
  return knex.schema.createTable('teacher', (table) => {
      table.increments()
      table.text('name')
      table.text('bio')
      table.text('instruments')
      table.text('style')
      table.text('url')
      table.text('email')
      table.text("phone_number")
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('teacher')
};

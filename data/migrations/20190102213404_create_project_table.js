exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table
      .string('id')
      .primary()
      .unique()
      .notNull()
    table
      .string('name')
      .notNull()
      .unique()
    table.text('description')
    table.integer('teamCount')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('projects')
}

exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table.increments()
    table
      .string('name')
      .notNull()
      .unique()
    table.text('description')
    table.string('category')
    table.string('author')
    table.string('authorCohort')
    table.integer('teamCount').defaultTo(0)
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('projects')
}

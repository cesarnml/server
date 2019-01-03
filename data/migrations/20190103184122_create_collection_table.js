exports.up = function (knex, Promise) {
  return knex.schema.createTable('collections', table => {
    table.increments()
    table
      .string('name')
      .notNull()
      .unique()
    table.text('description')
    table.date('start')
    table.date('end')
    table.integer('maxTeam').defaultTo(5)
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('collections')
}

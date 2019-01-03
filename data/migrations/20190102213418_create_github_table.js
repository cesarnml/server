exports.up = function (knex, Promise) {
  return knex.schema.createTable('github', table => {
    table
      .string('id')
      .primary()
      .unique()
      .notNull()
    table
      .string('username')
      .notNull()
      .unique()
    table.string('displayName')
    table.string('email').unique()
    table.string('photo')
    table.boolean('isAdmin').defaultTo(0)
    table
      .integer('projectId')
      .references('id')
      .inTable('projects')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('github')
}

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transaction', table => {
    table.increments()
    table.integer('user').references('id').inTable('account')
    table.integer('amount')
    table.string('purpose')
    table.string('type')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transaction')
}
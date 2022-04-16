import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('account', table => {
    table.increments()
    table.string('name')
    table.string('email')
    table.string('password')
    table.string('rf_token')
    table.text('avatar').defaultTo('https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png')
    table.string('type').defaultTo('register')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('account')
}
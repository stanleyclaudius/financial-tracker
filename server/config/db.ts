import knex from 'knex'
import dotenv from 'dotenv'
import { config } from './knexfile'

dotenv.config({
  path: './server/config/.env'
})

const conn = knex(config['production'])

export default conn
import { Sequelize } from 'sequelize'
import * as mysql2 from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbHost = process.env.DB_HOST

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: 'mysql',
  dialectModule: mysql2,
  host: dbHost
})

export default sequelize

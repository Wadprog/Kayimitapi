/**
 *
 * this files make a connection to the database or kill the application in case it is not successful.
 */

const mongoose = require('mongoose')
const { DB_URI } = require('../config')

const connect_to_DB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log('Database connected successfully ')
  } catch (error) {
    console.log(` Could not connect to database due to error ${error.message}`)
    process.exit(1)
  }
}

module.exports = connect_to_DB

const keys = require('./keys')

const knex = require('knex')({
    client: keys.postgres.client,
    connection: {
        host     : keys.postgres.host,
        user     : keys.postgres.user,
        password : keys.postgres.password,
        database : keys.postgres.database,
        charset  : keys.postgres.charset
  }
});

module.exports = require('bookshelf')(knex);
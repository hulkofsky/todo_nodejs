const {Client} = require('pg')
const keys = require('./keys')
const Bookshelf = require('./database')
const projects = require('./tables/projects')
const priorities = require('./tables/priorities')
const tasks = require('./tables/tasks')
const users = require('./tables/users')

const models = require('./models')

//connecting to postgres
const postgresClient = new Client({
    host: keys.postgres.host,
    port: keys.postgres.port,
    user: keys.postgres.user,
    password: keys.postgres.password,
    database: keys.postgres.database
})

postgresClient.connect((err)=>{
    err ? console.log(`Postgres connection error: ${err}`) :
        console.log('Postgres connected!')
})







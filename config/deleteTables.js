const {Client} = require('pg')
const keys = require('./keys')

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

const tables = [

    `DROP TABLE tasks;`,

    `DROP TABLE projects;`,

    `DROP TABLE priorities;`,

    `DROP TABLE users;`,
]

tables.forEach((item, i) => {
    let query = item
    postgresClient.query(query, (err) => {
        if (err) {
            console.log(`An error has been occured while deleting table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully deleted`)
        }
    })
})

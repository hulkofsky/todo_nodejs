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
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT
    );`,

    `CREATE TABLE IF NOT EXISTS projects(
        id SERIAL PRIMARY KEY,
        project_name TEXT NOT NULL,
        color TEXT NOT NULL,
        user_id INT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        task_name TEXT NOT NULL,
        priority_id INT NOT NULL,
        deadline TIMESTAMP NOT NULL,
        is_done BOOLEAN NOT NULL,
        project_id INT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS priorities(
        id INT PRIMARY KEY,
        priority_color TEXT NOT NULL
    );`,
]

tables.forEach((item, i)=>{
    let query = item
    postgresClient.query(query, (err)=>{
        if(err) {
            console.log(`An error has been occured while creating table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully created`)
        }
        
    })
})


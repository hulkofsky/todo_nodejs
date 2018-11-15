const {Client} = require('pg')

//connecting to postgres
const postgresClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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

new Promise((resolve, reject)=>{
    postgresClient.connect((err)=>{
        err ? reject(`Postgres connection error: ${err}`) :
            resolve('Postgres connected!')
    })
})
.then(()=>
Promise.all(tables.map((item,i)=>{
    return new Promise((resolve, reject)=>{
        postgresClient.query(item, (err)=>{
            if(err) {
                console.log(`An error has been occured while creating table ${i} - ${err}`)
                reject()
            } else {
                console.log(`Table ${i} succesfully created`)
                resolve()
            }
        })
    })
})))
.then(()=>{
    process.exit()
})
.catch(error=>{
    console.log(error)
})
const {Client} = require('pg')

console.log(process.env.DB_PASSWORD, 'password')

//connecting to postgres
const postgresClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const tables = [

    `DROP TABLE IF EXISTS tasks;`,

    `DROP TABLE IF EXISTS projects;`,

    `DROP TABLE IF EXISTS priorities;`,

    `DROP TABLE IF EXISTS users;`,
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
                reject()
                console.log(`An error has been occured while deleting table ${i} - ${err}`)
            } else {
                resolve()
                console.log(`Table ${i} succesfully deleted`)
            }
        })
    })
})))
.then((result)=>{
    process.exit()
})
.catch((error)=>{
    if (error){
        console.log(error)
    }
})
const {Client} = require('pg')

//connecting to postgres
const postgresClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

postgresClient.connect((err)=>{
    err ? console.log(`Postgres connection error: ${err}`) :
        console.log('Postgres connected!')
})

const tables = [

    `ALTER TABLE projects 
        ADD FOREIGN KEY (user_id) REFERENCES users(id)ON DELETE CASCADE;
    `,

    `ALTER TABLE tasks     
        ADD FOREIGN KEY (project_id) REFERENCES projects(id)ON DELETE CASCADE,
        ADD FOREIGN KEY (priority_id) REFERENCES priorities(id)ON DELETE CASCADE;
    `,
]

tables.forEach((item, i)=>{
    let query = item
    postgresClient.query(query, (err)=>{
        if(err) {
            console.log(`An error has been occured while creating table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully altered`)
        }

    })
})

Promise.all(tables.map((item,i)=>{
    return new Promise((resolve, reject)=>{
        postgresClient.query(item, (err)=>{
            if(err) {
                reject(`An error has been occured while creating table ${i} - ${err}`)
            } else {
                resolve(`Table ${i} succesfully altered`)
            }
        })
    })
})).then((result)=>{
    process.exit()
})


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


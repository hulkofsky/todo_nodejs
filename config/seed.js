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

//table projects
projects.forEach((item, i)=>{
    models.project
        .forge({
            project_name: item.project_name,
            user_id: item.user_id
        })
        .save()
        .then(result=>{
            console.log(`project ${item.project_name} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting branches ${item.project_name} - ${err}`)
        })
})

//table priorities
priorities.forEach((item, i)=>{
    models.priority
        .forge({
            id: item.id,
            priority_colour: item.priority_colour
        })
        .save(null, {method: 'insert'})
        .then(result=>{
            console.log(`priority ${item.priority_colour} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting priority ${item.priority_colour} - ${err}`)
        })
})

//table tasks
tasks.forEach((item, i)=>{
    models.task
    .forge({
        task_name:item.task_name,
        priority_id: item.priority_id,
        deadline: item.deadline,
        is_done: item.is_done,
        project_id: item.project_id
    })
    .save()
    .then(result=>{
        console.log(`task ${item.task_name} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting task ${item.task_name} - ${err}`)
    })
})

//table users
users.forEach((item, i)=>{
    models.user
    .forge({
        username:item.username,
        email: item.email,
        password: item.password
    })
    .save()
    .then(result=>{
        console.log(`user ${item.username} successfully inserted`)
    })
    .catch(err=>{
        console.log(`Error while inserting user ${item.username} - ${err}`)
    })
})







const {Client} = require('pg')
const projects = require('./tables/projects')
const priorities = require('./tables/priorities')
const tasks = require('./tables/tasks')
const users = require('./tables/users')

const models = require('../models/models')

//connecting to postgres
const postgresClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

new Promise((resolve, reject)=>{
    postgresClient.connect((err)=>{
        err ? reject(`Postgres connection error: ${err}`) :
            resolve('Postgres connected!')
    })
})
.then(()=>Promise.all( users.map((item, i) => {
    return new Promise((resolve, reject)=>{
        models.user
        .forge({
            username:item.username,
            email: item.email,
            password: item.password
        })
        .save()
        .then(result=>{
            resolve()
            console.log(`user ${item.username} successfully inserted`)
        })
        .catch(err=>{
            reject()
            console.log(`Error while inserting user ${item.username} - ${err}`)
        })
    })
})))
.then(()=>Promise.all(priorities.map((item,i)=>{
    return new Promise((resolve, reject)=>{
        models.priority
        .forge({
            id: item.id,
            priority_color: item.priority_color
        })
        .save(null, {method: 'insert'})
        .then(result=>{
            resolve()
            console.log(`priority ${item.priority_color} successfully inserted`)
        })
        .catch(err=>{
            reject()
            console.log(`Error while inserting priority ${item.priority_color} - ${err}`)
        })
    })
})))
.then(()=>Promise.all(tasks.map((item,i)=>{
    return new Promise((resolve, reject)=>{
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
            resolve()
        })
        .catch(err=>{
            console.log(`Error while inserting task ${item.task_name} - ${err}`)
            reject()
        })
    })
})))
.then(()=>Promise.all(projects.map((item,i)=>{

    return new Promise((resolve, reject)=>{
        models.project
        .forge({
            project_name: item.project_name,
            user_id: item.user_id,
            color: item.color
        })
        .save()
        .then(result=>{
            console.log(`project ${item.project_name} successfully inserted`)
            resolve()
        })
        .catch(err=>{
            console.log(`Error while inserting branches ${item.project_name} - ${err}`)
            reject()
        })
    })
})))
.then((result)=>{
    process.exit()
})
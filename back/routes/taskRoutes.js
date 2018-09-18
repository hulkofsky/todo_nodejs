const express = require('express')
const router = express.Router()
const models = require('../config/models')
//const Validation = require('../../utils/validation')
//const validation = new Validation
const bcrypt = require('bcrypt')

//create task
router.post('/:userId/projects/:projectId/tasks', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectId = req.params.projectId
    const taskInfo = req.body

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.user
    .query((qb) => {
        qb
        .where({token: token})
        .andWhere({id: userId})
    })
    .fetch()
    .then(user => {
        if(user){
           //validation
            // if(!validation.validateText(projectName)){
            //     return res.json({success: false, message: 'Project name validation failed'})
            // }

            models.task
            .forge({
                task_name: taskInfo.task_name,
                priority_id: taskInfo.priority_id,
                deadline: taskInfo.deadline,
                is_done: false,
                project_id: projectId
            })
            .save()
            .then(result=>{
                res.json({success: true, data: {id: result.get('id')}})
            })
            
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//update task
router.put('/:userId/projects/:projectId/tasks/:taskId', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectId = req.params.projectId
    const taskId = req.params.taskId
    const taskInfo = req.body

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.user
    .query((qb) => {
        qb
        .where({token: token})
        .andWhere({id: userId})
    })
    .fetch()
    .then(user => {
        if(user){
           //validation
            // if(!validation.validateText(projectName)){
            //     return res.json({success: false, message: 'Project name validation failed'})
            // }
            
            models.task
            .query((qb) => {
                qb
                .where({project_id: projectId})
                .andWhere({id: taskId})
            })
            .fetch()
            .then(task=>{
                if(task){
                    task
                    .save({
                        task_name: taskInfo.task_name,
                        priority_id: taskInfo.priority_id,
                        deadline: taskInfo.deadline,
                        is_done: taskInfo.is_done,
                        project_id: projectId
                    })
                    .then(result=>{
                        res.status(200).json({success: true, data: {message: `Task ${result.get('id')} successfully updated`}})
                    })
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        console.log(err, 'error')
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//delete task
router.delete('/:userId/projects/:projectId/tasks/:taskId', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectId = req.params.projectId
    const taskId = req.params.taskId

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.user
    .query((qb) => {
        qb
        .where({token: token})
        .andWhere({id: userId})
    })
    .fetch()
    .then(user => {
        if(user){
           //validation
            // if(!validation.validateText(projectName)){
            //     return res.json({success: false, message: 'Project name validation failed'})
            // }
            
            models.task
            .query((qb) => {
                qb
                .where({project_id: projectId})
                .andWhere({id: taskId})
            })
            .fetch()
            .then(task=>{
                if(task){
                    task
                    .destroy()
                    .then(()=>{
                        return res.status(200).json({success: true, data: {message: 'Task successfully deleted'}});
                    })
                }else{
                    res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

module.exports = router
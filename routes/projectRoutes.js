const express = require('express')
const router = express.Router()
const models = require('../config/models')
//const Validation = require('../../utils/validation')
//const validation = new Validation

//get project by id
router.get('/:userId/projects/:projectId', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectId = req.params.projectId


    console.log(token, 'project page token')
    console.log(userId, 'project page userId')
    console.log(projectId, 'project page projectId')

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
            models.project
            .forge({id: projectId})
            .fetch({withRelated: ['tasks']})
            .then(project=>{
                res.status(200).json({
                    success: true, 
                    user: user, 
                    project: project
                })
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }

    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//create project
router.post('/:userId/projects', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectName = req.body.project_name

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

            models.project
            .forge({
                project_name: projectName,
                user_id: userId
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

//update project
router.put('/:userId/projects/:projectId', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectId = req.params.projectId
    const projectName = req.body.project_name

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
            
            models.project
            .forge({id:  projectId})
            .fetch({require: true})
            .then(project=>{
                project
                .save({
                    project_name: projectName,
                    user_id: userId
                })
                .then(result=>{
                    res.json({success: true, data: {message: `Project ${result.get('id')} successfully updated`}})
                })
            })
            
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//delete project
router.delete('/:userId/projects/:projectId', (req,res)=>{
    const token = req.headers.token
    const userId = req.params.userId
    const projectId = req.params.projectId

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
            models.project
            .forge({id: projectId})
            .fetch({withRelated: ['tasks']})
            .then(project=>{
                         
                const projectData = JSON.stringify(project)
                let hasTasks = false 

                JSON.parse(projectData).tasks.forEach(element => {
                    console.log(element, 'element')
                    if(!element.is_done) hasTasks = true  
                });
                if(project&&!hasTasks){
                    project
                    .destroy()
                    .then(()=>{
                        return res.status(200).json({success: true, data: {message: 'Project successfully deleted'}});
                    })
                }else{
                    return res.status(500).json({success: false, data: {message: `Cannot delete project with unfinished tasks.`}})
                }
            })
        }else{
           return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
       return res.status(500).json({success: false, data: {message: err.message}})
    })
})

module.exports = router
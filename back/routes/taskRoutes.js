const express = require('express')
const router = express.Router()
const models = require('../models/models')
const TaskController = require('../controllers/taskController')
const taskController = new TaskController

//create task
router.post('/:userId/projects/:projectId/tasks', (req,res)=>{
    taskController.addTask(req,res)
})

//update task
router.put('/:userId/projects/:projectId/tasks/:taskId', (req,res)=>{
    taskController.updateTask(req,res)
})

//delete task
router.delete('/:userId/projects/:projectId/tasks/:taskId', (req,res)=>{
    taskController.deleteTask(req,res)
})

module.exports = router
const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/projectController')
const projectController = new ProjectController

router.get('/',(req,res)=>{
    projectController.homepage(req,res)
})

router.get('/:userId/done',(req,res)=>{
    projectController.doneTasks(req,res)
})

//get project by id
router.get('/:userId/projects/:projectId', (req,res)=>{
    projectController.projectTasks(req,res)
})

//get projects
router.get('/:userId/projects', (req,res)=>{
    projectController.projects(req,res)
})

//create project
router.post('/:userId/projects', (req,res)=>{
    projectController.addProject(req,res)
})

//update project
router.put('/:userId/projects/:projectId', (req,res)=>{
    projectController.updateProject(req,res)
})

//delete project
router.delete('/:userId/projects/:projectId', (req,res)=>{
    projectController.deleteProject(req,res)
})

module.exports = router
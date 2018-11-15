const Helper = require('../shared/helper')
const helper = new Helper
const AuthService= require('../services/authService')
const authService = new AuthService
const ProjectService= require('../services/projectService')
const projectService = new ProjectService
const TaskService= require('../services/taskService')
const taskService = new TaskService
const _ = require('lodash')

module.exports = class TaskController {
    async addTask(req,res){
        const taskData = {
            token: req.headers.token,
            userId: req.params.userId,
            projectId: req.params.projectId,
            task_name: req.body.task_name,
            priority_id: req.body.priority_id,
            deadline: req.body.deadline
        }
        try{
            await helper.validateParams (taskData)
            const user = await authService.checkAuthorization(taskData.userId, taskData.token)
            const task = await taskService.add(taskData)

            return res.status(200).json({
                success: true,
                user: user, 
                task: task,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async updateTask(req,res){
        const taskData = {
            token: req.headers.token,
            userId: req.params.userId,
            taskId: req.params.taskId,
            projectId: req.params.projectId,
            task_name: req.body.task_name,
            priority_id: req.body.priority_id,
            deadline: req.body.deadline,
            is_done: req.body.is_done
        }

        try{
            await helper.validateParams (taskData)
            const user = await authService.checkAuthorization(taskData.userId, taskData.token)
            await projectService.getOne(taskData.userId, taskData.projectId)
            const task = await taskService.getOne(taskData.projectId, taskData.taskId)
            const updatedTask = await taskService.update(task, taskData)

            return res.status(200).json({
                success: true,
                user: user, 
                task: updatedTask
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async deleteTask(req,res){
        const token = req.headers.token
        const userId = req.params.userId
        const projectId = req.params.projectId
        const taskId = req.params.taskId

        try{
            await helper.validateParams ({token, userId, projectId, taskId})
            const user = await authService.checkAuthorization(userId, token)
            await projectService.getOne(userId, projectId)
            const task = await taskService.getOne(projectId, taskId)
            const message = await taskService.delete(task)

            return res.status(200).json({
                success: true,
                user: user, 
                message: message
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }
}
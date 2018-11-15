const _ =require('lodash')
const AuthService= require('../services/authService')
const authService = new AuthService
const Helper = require('../shared/helper')
const helper = new Helper
const ProjectService = require('../services/projectService')
const projectService = new ProjectService

module.exports = class ProjectController {
    async homepage(req,res){
        const token = req.headers.token
        const userId = req.headers.user_id

        try{
            await helper.validateParams ({token, userId})
            const user = await authService.checkAuthorization(userId, token)
            const projects = await projectService.getWithTodaysTasks(userId)

            return res.status(200).json({
                success: true, 
                user: user, 
                projects: projects,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }    
    }

    async doneTasks(req,res){
        const token = req.headers.token
        const userId = req.params.userId

        try{
            await helper.validateParams ({token, userId})
            const user = await authService.checkAuthorization(userId, token)
            const projects = await projectService.getWithDoneTasks(userId)

            return res.status(200).json({
                success: true, 
                user: user, 
                projects: projects,
                doneTasks: projects.doneTasks
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async projectTasks(req,res){
        const token = req.headers.token
        const userId = req.params.userId
        const projectId = req.params.projectId

        try{
            await helper.validateParams ({token, userId, projectId})
            const user = await authService.checkAuthorization(userId, token)
            const projects = await projectService.getOne(userId, projectId)

            return res.status(200).json({
                success: true,
                user: user, 
                projects: projects,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async projects(req,res){
        const token = req.headers.token
        const userId = req.params.userId

        try{
            await helper.validateParams ({token, userId})
            const user = await authService.checkAuthorization(userId, token)
            const projects = await projectService.getAll(userId)

            return res.status(200).json({
                success: true,
                user: user, 
                projects: projects,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async addProject(req,res){
        const projectData = {
            token: req.headers.token,
            userId: req.params.userId,
            project_name: req.body.project_name,
            color: req.body.color
        }

        try{
            await helper.validateParams (projectData)
            const user = await authService.checkAuthorization(projectData.userId, projectData.token)
            const project = await projectService.add(projectData)

            return res.status(200).json({
                success: true,
                user: user, 
                project: project,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async updateProject(req,res){
        const projectData = {
            token: req.headers.token,
            userId: req.params.userId,
            projectId: req.params.projectId,
            project_name: req.body.project_name,
            color: req.body.color
        }

        try{
            await helper.validateParams (projectData)
            const user = await authService.checkAuthorization(projectData.userId, projectData.token)
            const project = await projectService.update(projectData)

            return res.status(200).json({
                success: true,
                user: user, 
                project: project,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }     
    }

    async deleteProject(req,res){
        const token = req.headers.token
        const userId = req.params.userId
        const projectId = req.params.projectId

        try{
            await helper.validateParams ({token, userId, projectId})
            await authService.checkAuthorization(userId, token)
            const project = await projectService.getWithUndoneTasks(userId, projectId)
            const message = await projectService.delete(project)

            return res.status(200).json({
                success: true,
                message: message
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }   
    }
}
const models = require('../models/models')
const _ = require('lodash')

module.exports = class projectService{
    getWithTodaysTasks(userId){
        return new Promise ((resolve, reject)=>{
            models.project
            .where({user_id: userId})
            .fetchAll({withRelated: ['tasks.priority', 'todaysTasks.priority', 'deadlinedTasks.priority']})
            .then(project=>{        
                if(project){
                    resolve(project)
                }else{
                    reject({success: false, status: 404,  errors: [`Project not found.`]})
                }
            })
        }) 
    }

    getWithDoneTasks(userId){
        return new Promise ((resolve, reject)=>{
            models.project
            .where({user_id: userId})
            .fetchAll({withRelated: ['tasks.priority', 'doneTasks.priority']})
            .then(project=>{        
                if(project){
                    resolve(project)
                }else{
                    reject({success: false, status: 404,  errors: [`Project not found.`]})
                }
            })
        }) 
    }

    getWithUndoneTasks(userId, projectId){
        return new Promise ((resolve, reject)=>{
            models.project
            .query((qb) => {
                qb
                .where({user_id: userId})
                .andWhere({id: projectId})
            })
            .fetch({withRelated: ['tasks.priority', 'undoneTasks.priority']})
            .then(project=>{        
                if(project){
                    resolve(project)
                }else{
                    reject({success: false, status: 404,  errors: [`Project not found.`]})
                }
            })
        }) 
    }

    getOne(userId, projectId) {
        return new Promise ((resolve, reject)=>{
            models.project
            .query((qb) => {
                qb
                .where({user_id: userId})
                .andWhere({id: projectId})
            })
            .fetch({withRelated: ['tasks.priority']})
            .then(project=>{
                if(project){
                    resolve(project)
                }else{
                    reject({success: false, status: 404,  errors: [`Project not found.`]})
                }
            })
        })
    }

    getAll(userId){
        return new Promise ((resolve, reject)=>{
            models.project
            .where({user_id: userId})
            .fetchAll()
            .then(projects=>{
                if(projects){
                    resolve(projects)
                }else{
                    reject({success: false, status: 404,  errors: [`Projects not found.`]})
                }
            })
        })
    }

    add(projectData){
        return new Promise ((resolve, reject)=>{
            models.project
            .forge({
                project_name: projectData.project_name,
                color: projectData.color,
                user_id: projectData.userId
            })
            .save()
            .then(result=>{
                if(result){
                    resolve(result)
                }else{
                    reject({success: false, status: 500,  errors: [`Error while saving project.`]})
                }
            })
        })
    }

    update(projectData){
        return new Promise ((resolve, reject)=>{
            this.getOne(projectData.userId, projectData.projectId)
            .then(project=>{
                return project.save({
                    project_name: projectData.project_name,
                    user_id: projectData.userId,
                    color: projectData.color
                })
            })
            .then(result=>{
                if(result){
                    resolve(result)
                }else{
                    reject({success: false, status: 500,  errors: [`Error while saving project.`]})
                }
            })  
        })
    }

    delete(project){
        return new Promise ((resolve, reject)=>{
            if(_.isEmpty(JSON.parse(JSON.stringify(project)).undoneTasks)){
                project.destroy()
                .then(()=>{
                    resolve(`Project successfully deleted.`)
                })     
            }else{
                reject({success: false, status: 500,  errors: [`Cannot delete a project with undone tasks.`]})
            }
        })
    }
}
const models = require('../models/models')


module.exports = class TaskService{
    add(taskData){
        return new Promise ((resolve, reject)=>{
            models.task
            .forge({
                task_name: taskData.task_name,
                priority_id: taskData.priority_id,
                deadline: taskData.deadline,
                is_done: false,
                project_id: taskData.projectId
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

    getOne(projectId, taskId){
        return new Promise ((resolve, reject)=>{
            models.task
            .query((qb) => {
                qb
                .where({project_id: projectId})
                .andWhere({id: taskId})
            })
            .fetch()
            .then(task=>{
                console.log(task, typeof task, 'task, suka blyat')
                if(task){
                    console.log('task est')
                    resolve(task)
                }else{
                    console.log('taska net')
                    reject({success: false, status: 404,  errors: [`Task not found.`]})
                }
            })
        })
    }

    update(task, taskData){
        return new Promise ((resolve, reject)=>{
            task.save({
                project_id: taskData.projectId,
                task_name: taskData.task_name,
                priority_id: taskData.priority_id,
                deadline: taskData.deadline,
                is_done: taskData.is_done
            }) 
            .then(result=>{
                if(result){
                    resolve(result)
                }else{
                    reject({success: false, status: 500,  errors: [`Error while saving task.`]})
                }
            })
        })
    }

    delete(task){
        return new Promise ((resolve, reject)=>{
            task
            .destroy()
            .then((result)=>{
                resolve(`Task successfully deleted.`)
            })
        })
    }
}
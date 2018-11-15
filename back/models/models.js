const Bookshelf = require('../config/database')
const cascadeDelete = require('bookshelf-cascade-delete')

Bookshelf.plugin(cascadeDelete);

const priority = Bookshelf.Model.extend({tableName: 'priorities'})

const task = Bookshelf.Model.extend({tableName: 'tasks'})

const taskWithPriority = Bookshelf.Model.extend(
    {
        tableName: 'tasks',
        priority: function () {
            return this.belongsTo(priority, 'priority_id')
        },
        
    }
)

const project = Bookshelf.Model.extend({
    tableName: 'projects',
    tasks: function(){
        return this.hasMany(taskWithPriority, 'project_id' )
    },

    doneTasks: function(){
        return this
            .hasMany(taskWithPriority)
            .query((qb) => {
                qb.where({is_done: true})
            })
    },

    undoneTasks: function(){
        return this
            .hasMany(taskWithPriority)
            .query((qb) => {
                qb.where({is_done: false})
            })
    },

    deadlinedTasks: function(){
        const today = new Date().toISOString().substring(0, 19).replace('T', ' ')
        
        return this
            .hasMany(taskWithPriority)
            .query((qb) => {
                qb
                .where('is_done', '=', false)
                .andWhere('deadline', '<=', today)
            })
            .orderBy('-priority_id')
    },

    todaysTasks: function () {
        const today = new Date().toISOString().substring(0, 19).replace('T', ' ')
        const tomorrow = new Date(Date.now()+86400000).toISOString().substring(0, 19).replace('T', ' ')

        return this
            .hasMany(taskWithPriority)
            .query((qb) => {
                qb
                .where('deadline', '>=', today)
                .andWhere('deadline', '<=', tomorrow)
                .orderBy('priority_id')
            })
            .orderBy('-priority_id')
            
    }
})

const user = Bookshelf.Model.extend({
    tableName: 'users',
    projects: function(){
        return this.hasMany(project, 'user_id')
    },
})

module.exports = models = {
    priority: priority,
    project: project,
    task: task,
    user: user
}
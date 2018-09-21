const Bookshelf = require('../config/database')
const cascadeDelete = require('bookshelf-cascade-delete')

Bookshelf.plugin(cascadeDelete);

const priority = Bookshelf.Model.extend({tableName: 'priorities'})
const project = Bookshelf.Model.extend({
    tableName: 'projects',
    tasks: function(){
        return this.hasMany(
            Bookshelf.Model.extend(
                {
                    tableName: 'tasks',
                    priority: function () {
                        return this.belongsTo(priority, 'priority_id')
                    }
                }
            ),
            'project_id'
        )
    },
})

const task = Bookshelf.Model.extend({tableName: 'tasks'})
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
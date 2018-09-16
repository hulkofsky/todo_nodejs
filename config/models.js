const Bookshelf = require('../config/database')
const cascadeDelete = require('bookshelf-cascade-delete')

Bookshelf.plugin(cascadeDelete);

const priority = Bookshelf.Model.extend({tableName: 'priorities'})
const project = Bookshelf.Model.extend({tableName: 'projects'})
const task = Bookshelf.Model.extend({tableName: 'tasks'})
const user = Bookshelf.Model.extend({tableName: 'users'})

module.exports = models = {
    priority: priority,
    project: project,
    task: task,
    user: user
}
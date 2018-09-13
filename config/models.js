const Bookshelf = require('../config/database')
const cascadeDelete = require('bookshelf-cascade-delete')

Bookshelf.plugin(cascadeDelete);
const express = require('express')
const projectRouter = express.Router()
const models = require('../config/models')
//const Validation = require('../../utils/validation')
//const validation = new Validation
const bcrypt = require('bcrypt')

//get all admins
projectRouter.get('/admins', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.admin
            .forge()
            .fetchAll()
            .then(admins=>{
                res.status(200).json({success: true, data: admins})
            }).catch(err=>{
                res.status(500).json({success: false, data: {message: err.message}})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }

    })
})

//get admin by id
projectRouter.get('/admins/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.admin
            .forge({id: req.params.id})
            .fetch().
            then(admin=>{
                res.json({success: true, data: admin})
            }).catch(err=>{
                res.status(500).json({success: false, data: {message: err.message}})
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
})

//create admin
projectRouter.post('/admins', (req,res)=>{
    const token = req.headers.token
    const userData = req.body

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
           //validation
            if(!validation.validateText(userData.username)){
                return res.json({success: false, message: 'Admin name validation failed'})
            }

            if(!validation.validateEmail(userData.email)){
                return res.json({success: false, message: 'Email validation failed'})
            }

            if(!validation.validatePass(userData.password)){
                return res.json({success: false, message: 'Password validation failed'})
            }

            if(userData.password!=userData.confPass){
                return res.json({success: false, message: 'Passwords does not match'})
            }

            //bcrypt
            bcrypt.genSalt(10, (err,salt)=> {
                if (err) {
                    console.log(err, 'while crypting password(gensalt)')
                }
                bcrypt.hash(userData.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err, 'while crypting password')
                    } else {
                        models.admin
                        .forge({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                        })
                        .save()
                        .then(collection=>{
                            res.json({success: true, data: {id: collection.get('id')}})
                        }).catch(err=>{
                            res.status(500).json({success: false, data: {message: err.message}})
                        })
                    }
                })
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//update admin
projectRouter.put('/admins/:id', (req,res)=>{
    const token = req.headers.token
    const userData = req.body
    const adminId = req.params.id

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            //validation
            if(!validation.validateText(userData.username)){
                return res.json({success: false, message: 'Admin name validation failed'})
            }

            if(!validation.validateEmail(userData.email)){
                return res.json({success: false, message: 'Email validation failed'})
            }

            if(!validation.validatePass(userData.password)){
                return res.json({success: false, message: 'Password validation failed'})
            }

            if(userData.password!=userData.confPass){
                return res.json({success: false, message: 'Passwords does not match'})
            }

            //bcrypt
            bcrypt.genSalt(10, (err,salt)=> {
                if (err) {
                    console.log(err, 'while crypting password(gensalt)')
                }
                bcrypt.hash(userData.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err, 'while crypting password')
                    } else {
                        models.admin
                        .forge({id:  adminId})
                        .fetch({require: true})
                        .then(admin=>{
                            admin
                            .save({
                                username: req.body.username,
                                password: hash,
                                email: req.body.email,
                            })
                            .then(collection=>{
                                res.json({success: true, data: {id: collection.get('id')}})
                            })
                        })
                    }
                })
            })
        }else{
            res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//delete project
projectRouter.delete('/admins/:id', (req,res)=>{
    const token = req.headers.token

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
    .forge({signin_token: token}) //token check here
    .fetch()
    .then(user => {
        if(user){
            models.admin
            .forge({id: req.params.id})
            .fetch()
            .then(admin=>{
                if(admin){
                    admin
                    .destroy()
                    .then(()=>{
                        return res.status(200).json({success: true, data: {message: 'Admin successfully deleted'}});
                    })
                }else{
                    return res.status(404).json({success: false, data: {message: `404. Not found.`}})
                }
            })
        }else{
           return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
        }
    })
    .catch(err=>{
       return res.status(500).json({success: false, data: {message: err.message}})
    })
})

//delete multiple admins
projectRouter.delete('/admins', (req,res)=>{
    const token = req.headers.token
    const ids = JSON.parse(req.body.ids)

    if(!token){
        return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
    }

    models.admin
        .forge({signin_token: token}) //token check here
        .fetch()
        .then(user => {
            if(user){
                models.admin
                    .query()
                    .whereIn('id', ids).del().then(count=>{
                    res.status(200).json({success: true, data: {message: `Successfully deleted ${count} rows.`}})
                })
            }else{
                return res.status(403).json({success: false, data: {message: `403. Restricted.`}})
            }
        })
        .catch(err=>{
            return res.status(500).json({success: false, data: {message: err.message}})
        })
})

module.exports = projectRouter
const express = require('express')
const router = express.Router()
const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../config/models')

//get LOG IN page
router.get('/login', (req,res)=>{
    res.render('login')
})

//get register page
router.get('/register', (req,res)=>{
    res.render('register')
})

//get LOG IN page
router.get('/projects', (req,res)=>{
    //load projects view
})

//LOGIN
router.post('/login', (req,res)=> {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password, "credentials")
    if (!email || !password) {
        res.json({success: false, message: 'Pls enter username and password to sign in'})
    } else {
        models.user
        .where({email: email})
        .fetch()
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.get('password'), (err, isMatch) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            success: false,
                            massage: `An error has been occured while comparing passwords ${err}`
                        })
                    }
                    if (isMatch) {
                        jwt.sign({email: user.get('email')}, keys.secret, {expiresIn: 10000},(err, token)=>{
                            models.user
                            .forge({email: email})
                            .fetch({withRelated: ['projects'], require: true})
                            .then(user=> {
                                user
                                .save({token: `JWT ${token}`})
                                .then(user=>{
                                    console.log(user, 'user with projects')
                                    console.log(JSON.stringify(user), 'user gET')
                                    
                                    res.json({
                                             success: true,
                                             user: user,
                                        })
                                    // res.render('projects', {
                                    //     title: 'projects',
                                    //     user: JSON.stringify(user)
                                    // })
                                })
                            })
                        })
                    } else {
                        res.json({success: false, message: 'Authentication failed.'})
                    }
                })
            } else {
                res.status(404).json({success: false, message: 'User not found!'})
            }
        })
        .catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
    }
})

router.post('/register', (req,res)=>{
    const userData = req.body;

    console.log(userData, 'userdata user signup')

    //validation.validateUserSignup(userData, res)

    //bcrypting password
    bcrypt.genSalt(10, (err,salt)=>{
        if (err){
            console.log(err, 'while crypting password(gensalt)')
        }
        bcrypt.hash(userData.password, salt, (err, hash)=>{
            if (err) {
                console.log(err, 'while crypting password')
            }else{
                //searching bank id in table BANKS
                models.user
                .forge({
                    username: userData.username,
                    email: userData.email,
                    password: hash
                })
                .save()
                .then(user => {
                    return res.json({success: true, data: {id: user.get('id')}})
                })  
            }
        })
    })
})

module.exports = router
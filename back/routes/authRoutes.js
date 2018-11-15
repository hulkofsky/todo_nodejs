const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController')
const authController = new AuthController

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
    authController.login(req,res)
})

router.post('/register', (req,res)=>{
    authController.register(req,res)
})

router.post('/logout',(req,res)=>{
    authController.logout(req,res)
})

module.exports = router
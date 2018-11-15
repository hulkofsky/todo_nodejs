const bcrypt = require('bcrypt')
const _ = require('lodash')
const Helper = require('../shared/helper')
const helper = new Helper
const UserService = require('../services/authService')
const userService = new UserService

module.exports = class AuthController {
    async login(req,res){
        const params = {
            email: req.body.email,
            password: req.body.password,
        }
        try {   
            await helper.validateParams(params)
            const user = await userService.getUserByEmail(params.email)
            await helper.comparePassword(params.password, user.get('password'))
            const token = await helper.createToken(params.email)
            const updatedUser = await userService.updateUser(user, {token: `JWT ${token}`})

            const updatedUserData = {
                id: updatedUser.get('id'),
                username: updatedUser.get('username'),
                email: updatedUser.get('email'),
                token: updatedUser.get('token'),
            }

            res.status(200).json({
                success: true,
                user: updatedUserData,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }
    }

    async register(req,res){
        const userData = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
        
        try {   
            await helper.validateParams(userData)
            await userService.checkUserEmail(userData.email)
            const password = await bcrypt.hash(userData.password, 10)
            const token = await helper.createToken(userData.email)

            const data = {
                email: userData.email,
                password: password,
                username: userData.username,
                token: `JWT ${token}`
            }

            const newUSer = await userService.createUser(data)

            res.status(200).json({
                success: true,
                user: newUSer,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }
    }

    async logout(req,res){
        const token = req.headers.token
        const userId = req.body.user_id

        console.log(token, userId, 'token user id')

        try {   
            await helper.validateParams({token, userId})
            const user = await userService.checkAuthorization(userId, token)
            await userService.updateUser(user, {token: ` `})

            res.status(200).json({
                success: true,
                message: `Successfully logout.`,
            })
        } catch (error) {
            if (!_.isEmpty(error)) {
                res.status(error.status).json(error)
            }
        }
    }
}
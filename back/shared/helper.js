const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = class Helper{
    validateParams (params){
        return new Promise((resolve, reject)=>{
            const errors = []
            for (var element in params) {
                if(!params[element]){
                    errors.push(`Pls specify ${element}`)
                }
            }
            if (errors.length !== 0){
                reject({success: false, status: 500, errors: errors})
            }else{
                resolve({success: true, errors: 'none'})
            }
        })
    } 
    
    createToken(data){
        return new Promise ((resolve,reject)=>{
            console.log(process.env.SECRET, 'secret mothefucker')
            jwt.sign({email: data}, process.env.SECRET, {expiresIn: 10000}, (error, token)=>{
                if(error){
                    reject({success: false, status: 500, errors: [error]})
                }else{
                    console.log(token, 'token in helpers')
                    resolve(token)
                }
            })
        })  
    }

    comparePassword(enteredPassword, passwordHash){
        return new Promise ((resolve, reject)=>{
            bcrypt
            .compare(enteredPassword, passwordHash)
            .then(isMatch=>{
                if(isMatch){
                    resolve()
                }else{
                    reject({success: false, status: 500, errors: [`Authentification failed`]})
                }
            })
        })
    }
}
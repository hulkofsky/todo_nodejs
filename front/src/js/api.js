'use strict'

import $ from 'jquery'
import Handlebars from 'handlebars/dist/handlebars.min'
import Validation from './validation'
import Functions from './functions'
import Render from './render'
import {constants} from './constants'

export default class RestInterraction {
    wrapper(){
        return $('.wrapper')
    }

    registration(fieldSelectors){
        console.log(constants, 'baseurl')
        const validation = new Validation()
        const functions = new Functions()
        const _this = this
        const noValidationErrors = validation.registerValidate(fieldSelectors)

        
        if (noValidationErrors) {
            $.ajax({
                url: `${constants.baseUrl}register`, 
                method: 'POST',
                dataType: 'json',
                data: {
                    username: $(fieldSelectors.username).val(),
                    email: $(fieldSelectors.email).val(),
                    password: $(fieldSelectors.password).val(),
                },

                success: data => {
                    functions.messageDelete('inputError', fieldSelectors.registerButton)
                    functions.showMessage('success', fieldSelectors.registerButton, 'Your account was succesfully created!')
                    setTimeout(()=>{
                        _this.init()
                    }, 3000)
                },

                // beforeSend: () => {
                //     $(fieldSelectors.registerButton).html('<img width="30" src="img/Cube.svg">')
                // },

                error: (xhr)=> {
                    const errors = ($.parseJSON(xhr.responseText)).errors

                    $(fieldSelectors.registerButton).html('Register')
                    functions.showMessage('inputError', fieldSelectors.registerButton, '')

                    for(let errorItem in errors) {
                        $('.inputError').append(`<p>${errors[errorItem]}</p>`)
                    }
                }

            })
        }
    }

    redirectToLogin(){
        const _this = this
        const functions = new Functions()

        functions.showModal('errorModal', 'body', 'Sorry, Your session is over. You will be redirected to login page.')
        setTimeout(()=>{
            _this.init()
            functions.deleteModal('errorModal')
        }, 3000)
    }

    login(emailSelector, passwordSelector, loginBtnSelector){
        const validation = new Validation();
        const functions = new Functions();

        if (validation.loginValidate(emailSelector, passwordSelector)) {
           let _this = this;
            $.ajax({
                url: `${constants.baseUrl}login`, 
                method: 'POST',
                dataType: 'json',
                data: {
                    email: $(emailSelector).val(),
                    password: $(passwordSelector).val()
                },
                
                success: data => {
                    console.log(data, 'register post data')
                    localStorage.userId = data.user.id
                    localStorage.token = data.user.token
                    _this.init()
                }, 
                // beforeSend: ()=> {
                //     $(loginBtnSelector).html('<img width="30" src="img/Cube.svg">')
                // },

                error: function(xhr, status, error) {
                    $('.inputError').remove()
                    functions.showMessage('inputError', loginBtnSelector, 'User with this login/password combination not found!')
                    $(loginBtnSelector).html('Login')
                }
            })
        }
    } //LOGIN

    logout(){
        document.cookie = 'session-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
        this.init()
    }; //LOGOUT

    init(){
        const functions = new Functions()
        const render = new Render()
        const token = localStorage.token
        const userId = localStorage.userId

        console.log(token, 'init token')
        if(token) {
            $.ajax({
                url: constants.baseUrl, 
                method: 'GET',
                dataType: 'json', 
                headers: {
                    user_id: userId,
                    token: token
                },

                success: (data) => {
                    console.log(data, "project page data")
                    render.profilePage(data)
                },
                error: (err) => {
                    console.log(err.status, typeof err.status, "error")
                    if (err.status == 403){
                        render.loginPage()
                    }else{
                        console.log(err, 'error is not 403')
                    }
                },
            })
        } else {
            render.loginPage()
        }
    }
}
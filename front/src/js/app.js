'use strict';

import $ from 'jquery';
import RestInterraction from './api.js'
import Validation from './validation.js'
import Functions from './functions.js'
import Render from './render.js'

(function(){
    const api = new RestInterraction()
    const validation = new Validation()
    const functions = new Functions()
    const render = new Render()

    api.init();

    $('body').on('click', '[name=loginBtn]', function() {
        console.log('login event')
        api.login('[name="email"]', '[name="password"]', '[name=loginButton]')
    })

    $('body').on('click', '[name=registerButton]', function() {
        const registerFieldSelectors = {
            username: '[name="username"]',
            email: '[name="email"]',
            password: '[name="password"]',
            confirmPass: '[name="confirmPass"]',
            captcha: '[name="captcha"]',
            firstname: '[name="firstname"]',
            lastname: '[name="lastname"]',
            registerButton: '[name="registerButton"]'
        };

        api.registration(registerFieldSelectors);
    })

    $('body').on('click', '[name=toRegister]', function(e) {
        e.preventDefault()
        render.registerPage()
    })

    $('body').on('click', '[name=toLogin]', function(e) {
        e.preventDefault()
        api.init()
    })

    $('body').on('click', '[name=logout]', function(e) {
        e.preventDefault()
        api.logout()
    })

    //USERNAME VALIDATION
    $('body').on('blur', '[name="username"]', function(){
        validation.usernameValidate('[name="username"]')
    });

    //EMAIL VALIDATION
    $('body').on('blur', '[name="email"]', function(){
        validation.emailValidate('[name="email"]')
    })
    
    //PASSWORD VALIDATION
    $('body').on('blur', '[name="password"]', function(){
        validation.passwordValidate('[name="password"]', '[name="confirmPass"]')
    })
    
    //PASSWORD MATCH VALIDATION
    $('body').on('blur', '[name="confirmPass"]', function(){
        validation.confirmPassValidate('[name="password"]', '[name="confirmPass"]')
    })
    
    //CAPS LOOK DETECTION
    $('body').on('keypress', '[name="password"]', function(e){
        functions.capsDetection(e, '[name="password"]')
    })

    $('body').on('keypress', '[name="confirmPass"]', function(e){
        functions.capsDetection(e, '[name="confirmPass"]')
    })
}())
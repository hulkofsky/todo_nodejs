'use strict';

import $ from 'jquery';
import Functions from './functions.js'

export default class Validation {
    constructor() {
        this.noValidationErrors = false;
    }

    loginValidate(loginFieldSelector, passwordFieldSelector){
        const functions = new Functions;

        if(!$(loginFieldSelector).val()) {
            functions.showMessage('inputError', loginFieldSelector, 'Enter your login pls.')
            return false
        } else if(!$(passwordFieldSelector).val()) {
            functions.showMessage('inputError', passwordFieldSelector, 'Enter your password pls.')
            return false
        } else {
            return true
        }
    }

    usernameValidate(usernameFieldSelector){
        const loginPattern = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i
        let functions = new Functions

        if (!$(usernameFieldSelector).val()) {
            functions.showMessage('inputError', usernameFieldSelector, 'Username cannot be empty!')
            this.noValidationErrors = false
            return false
        } else if ($(usernameFieldSelector).val().length < 4) {
            functions.showMessage('inputError', usernameFieldSelector, 'Username cannot be less then 4 symbols!')
            this.noValidationErrors = false
            return false
        } else if (!$(usernameFieldSelector).val().match(loginPattern)) {
            functions.showMessage('inputError', usernameFieldSelector, 'Only this symbols allowed: a-z, 0-9, -, _!')
            this.noValidationErrors = false
            return false
        } else {
            functions.messageDelete('inputError', usernameFieldSelector)
            this.noValidationErrors = true
            return true
        }
    }

    emailValidate(emailFieldSelector){
        const emailPattern = /^\w+@\w+\.\w{2,4}$/i
        const functions = new Functions

        if(!$(emailFieldSelector).val()) {
            functions.showMessage('inputError', emailFieldSelector, 'E-mail cannot be empty!')
            this.noValidationErrors = false
            return false
        } else if (!$(emailFieldSelector).val().match(emailPattern)) {
            functions.showMessage('inputError', emailFieldSelector, 'Invalid Email!')
            this.noValidationErrors = false
            return false
        } else {
            functions.messageDelete('inputError', emailFieldSelector)
            this.noValidationErrors = true
            return true
        }
    }

    passwordValidate(passwordFieldSelector, confirmPassFieldSelector){
        const functions = new Functions

        if(!$(passwordFieldSelector).val()) {
            functions.showMessage('inputError', passwordFieldSelector, 'Password cannot be empty!')
            this.noValidationErrors = false
            return false
        } else if ($(passwordFieldSelector).val().length < 6) {
            functions.showMessage('inputError', passwordFieldSelector, 'Password cannot be shorter then 6 symbols!')
            this.noValidationErrors = false
            return false
        } else if ($(confirmPassFieldSelector).val() && $(confirmPassFieldSelector).val() !== $(passwordFieldSelector).val()) {
            functions.showMessage('inputError', confirmPassFieldSelector, 'Passwords does not match!')
            this.noValidationErrors = false
            return false
        } else {
            functions.messageDelete('inputError', passwordFieldSelector)
            functions.messageDelete('inputError', confirmPassFieldSelector)
            this.noValidationErrors = true
            return true
        }
    }

    confirmPassValidate(passwordFieldSelector, confirmPassFieldSelector){
        const functions = new Functions

        if($(confirmPassFieldSelector).val() == $(passwordFieldSelector).val()) {
            functions.messageDelete('inputError', confirmPassFieldSelector)
            this.noValidationErrors = true
            return true
        } else {
            functions.showMessage('inputError', confirmPassFieldSelector, 'Passwords does not match!')
            this.noValidationErrors = false
            return false
        }
    }

    registerValidate(fieldSelectors){
        this.usernameValidate(fieldSelectors.username)
        this.emailValidate(fieldSelectors.email)
        this.passwordValidate(fieldSelectors.password, fieldSelectors.confirmPass)
        this.confirmPassValidate(fieldSelectors.password, fieldSelectors.confirmPass)
        return this.noValidationErrors
    }
}
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

    showProjectTasks(projectId, container){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const render = new Render
        const functions = new Functions
        
        $.ajax({
            url: `${constants.baseUrl}${userId}/projects/${projectId}`, 
            method: 'GET',
            dataType: 'json',
            headers: {
                token: token
            },
            success: data => {
                console.log(data, 'showProjectTasks data')
                data.project.tasks.sort(functions.compareNumericDesc).reverse()
                
                //filter not done tasks here

                render.tasks(container, data)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    addProject(container, project_name, color){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const functions = new Functions
        
        console.log(color, "create project color")

        $.ajax({
            url: `${constants.baseUrl}${userId}/projects`, 
            method: 'POST',
            dataType: 'json',
            headers: {
                token: token
            },
            data: {
                project_name: project_name,
                color: color
            },
            success: data => {
                this.getProjects(container)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }   

    deleteProject(container, projectId){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const functions = new Functions

        console.log(projectId, `project id`)
        $.ajax({
            url: `${constants.baseUrl}${userId}/projects/${projectId}`, 
            method: 'DELETE',
            dataType: 'json',
            headers: {
                token: token
            },
            
            success: data => {
                this.getProjects(container)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    editProject(container, projectId, project_name, color){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const functions = new Functions

        console.log(projectId, `project id`)
        $.ajax({
            url: `${constants.baseUrl}${userId}/projects/${projectId}`, 
            method: 'PUT',
            dataType: 'json',
            headers: {
                token: token
            },
            
            data: {
                project_name, project_name,
                color: color
            },

            success: data => {
                this.getProjects(container)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    getProjects(container){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const render = new Render
        const functions = new Functions
        

        $.ajax({
            url: `${constants.baseUrl}${userId}/projects`, 
            method: 'GET',
            dataType: 'json',
            headers: {
                token: token
            },
        
            success: data => {
                console.log(data, 'get projects data')
                render.projects(container, data)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    showAddTaskModal(container, taskData){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const render = new Render
        const functions = new Functions
        

        $.ajax({
            url: `${constants.baseUrl}${userId}/projects`, 
            method: 'GET',
            dataType: 'json',
            headers: {
                token: token
            },
        
            success: data => {
                const context = {
                    selectOptions: data,
                    editData: taskData
                }
                console.log(context, 'get projects data')
                render.createTask(container, context)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }
    
    addTask(container, params) {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const functions = new Functions

        $.ajax({
            url: `${constants.baseUrl}${userId}/projects/${params.project_id}/tasks`, 
            method: 'POST',
            dataType: 'json',
            headers: {
                token: token
            },
            data: {
                task_name: params.task_name,
                priority_id: params.priority_id,
                project_id: params.project_id,
                deadline: params.date
            },
            success: data => {
                this.showProjectTasks(params.project_id, container)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    deleteTask(container, task_id, project_id){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const functions = new Functions

        console.log(project_id, `project id`)
        $.ajax({
            url: `${constants.baseUrl}${userId}/projects/${project_id}/tasks/${task_id}`, 
            method: 'DELETE',
            dataType: 'json',
            headers: {
                token: token
            },
            
            success: data => {
                this.showProjectTasks(project_id, container)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    editTask(container,task_id,project_id, taskData){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const functions = new Functions

        $.ajax({
            url: `${constants.baseUrl}${userId}/projects/${project_id}/tasks/${task_id}`, 
            method: 'PUT',
            dataType: 'json',
            headers: {
                token: token
            },
            
            data: {
                task_name: taskData.task_name,
                priority_id: taskData.priority_id,
                deadline: taskData.deadline,
                project_id: project_id
            },

            success: data => {
                this.showProjectTasks(project_id, container)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    showTodaysTasks(container){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const render = new Render
        const functions = new Functions
        $.ajax({
            url: constants.baseUrl, 
            method: 'GET',
            dataType: 'json', 
            headers: {
                user_id: userId,
                token: token
            },

            success: (data) => {
                console.log(data, 'showtodays tasks data')
                console.log(data.project.color, 'showtodays tasks data.project.color,')
                console.log(data.project.id, 'showtodays tasks data.project.id')
               // console.log(data, 'showtodays tasks data')
                const context = {
                    project: {
                        tasks: data.todayTasks,
                    }    
                }
                
                context.project.tasks.sort(functions.compareNumericDesc).reverse()

                console.log(data.todayTasks, 'context')
                render.tasks(container, context)
            },
            error: (err) => {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            },
        })
    }

    showDoneTasks(container){
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const render = new Render
        const functions = new Functions
        
        $.ajax({
            url: `${constants.baseUrl}${userId}/done`, 
            method: 'GET',
            dataType: 'json',
            headers: {
                token: token
            },
            success: data => {
                console.log(data, 'showDoneTasks data')
                data.todayTasks.sort(functions.compareNumericDesc).reverse()
                
                const context = {
                    project: {
                        tasks: data.todayTasks,
                    }    
                }
                
                //filter not done tasks here

                render.tasks(container, context)
            },

            error: function(xhr, status, error) {
                $('.inputError').remove()
                functions.showMessage('inputError', container, 'Oops something went wrong. Pls try again later!')
            }
        })
    }

    

    registration(fieldSelectors){
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
    } 

    logout(){
        //delete token here
        this.init()
    }

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
                    data.todayTasks.sort(functions.compareNumericDesc).reverse()
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
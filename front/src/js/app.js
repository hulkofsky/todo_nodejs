'use strict';

import $ from 'jquery';
import Api from './api.js'
import Validation from './validation.js'
import Functions from './functions.js'
import Render from './render.js'

(function(){
    const api = new Api()
    const validation = new Validation()
    const functions = new Functions()
    const render = new Render()

    api.init();

    $('body').on('click', '[name=showDoneTasks]',function(e){
        api.showDoneTasks($('.cont-mid'))
    })

    $('body').on('click', '[name="editTask"]', function(){
        const task_id = $(this).data().id
        const project_id = $(this).data().project_id
        const taskData = {
            task_name: $('#project-name').val(),
            priority_id: $('#priority').children().attr('selected').data().id, //fix selector here
            deadline: $('#deadline-date').val()
        }
        api.editTask($('.cont-mid'),task_id, project_id, taskData)
    })

    $('body').on('click', '[name=showEditTaskModal]',function(){
        const taskData = {
            task_id: $(this).parent().data().id,
            project_id: $(this).parent().data().project_id,
            task_name: $(this).parent().prev().children('p').html(),
            project_name: $(this).parent().next().children('p').html(),
            priority_id: $(this).data().priority_id,
            deadline: $(this).data().date.substring(0, 10)
        }
        api.showAddTaskModal($('.task-modal-wrapper'), taskData)
     })

    $('body').on('click', '[name=todaysTasks]',function(e){
        console.log("show todays tasks")
        api.showTodaysTasks($('.cont-mid'))
    })

    $('body').on('click', '[name="doneTask"]', function(){
        const task_id = $(this).parent().data().id
        const project_id = $(this).parent().data().project_id
        const taskData = {
            is_done: true
        }
        api.editTask($('.cont-mid'),task_id,project_id, taskData)
    })


    $('body').on('click', '[name="deleteTask"]', function(){
        const task_id = $(this).parent().data().id
        const project_id = $(this).parent().data().project_id

        api.deleteTask($('.cont-mid'),task_id,project_id)
    })

    $('body').on('click', '[name=addTask]', function(){
        
        const params = {
            project_id: $('#project-name').find(':selected').data('id'),
            priority_id: $('#priority').find(':selected').data('id'),
            task_name: $('#task-name').val(),
            date: $('#deadline-date').val()
        }
        console.log(params , 'addtask params')
        api.addTask($('.cont-mid'), params)
     })

    $('body').on('click', '[name=cancelAddTask]',function(){
        $('.task-modal-wrapper').html(`<a class="projects-link" name="showAddTaskModal" href="#">+ Add Task</a>`)
    })

    $('body').on('click', '[name=showAddTaskModal]',function(){
       api.showAddTaskModal($('.task-modal-wrapper'))
    })


    $('body').on('click', '[name=editProject]',function(){
        const projectId = $(this).data().id
        api.editProject($('.projects-list'), projectId, $('.modal-input').val(), $('.modal-color').val())
    })

    $('body').on('click', '[name=showEditModal]',function(){
        console.log($(this).prev().prev('.projects-list-color').attr("style").replace("background-color: ", ""), `color`)
        $('.add-wrapper').html(` 
            <div class="modal-inputs">
                <input class="modal-color" type="color" value="${$(this).prev().prev('.projects-list-color').attr("style").replace("background-color: ", "")}">
                <input class="modal-input" type="text" value="${$(this).prev('.projects-list-a').html()}">
            </div>
            <div class="modal-buttons">
                <button class="modal-button" name="editProject" data-id="${$(this).prev('.projects-list-a').data().id}" type="button">Edit</button>
                <a href="#" class="modal-link" name="cancelAddProject">Cancel</a>
            </div>
        `)
    })

    $('body').on('click', '[name=deleteProject]',function(){
        const projectId = $(this).prev().prev('.projects-list-a').data().id
        api.deleteProject($('.projects-list'),projectId)
    })

    $('body').on('click', '[name=cancelAddProject]',function(){
        $('.add-wrapper').html(`<a class="projects-link" name="showAddProjectModal" href="#">+ Add Project</a>`)
    })

    $('body').on('click', '[name=showAddProjectModal]',function(){
        $('.add-wrapper').html(`
            
        <div class="modal-inputs">
            <input class="modal-color" type="color">
            <input class="modal-input" type="text">
        </div>
        <div class="modal-buttons">
            <button class="modal-button" name="addProject" type="button">Add</button>
            <a href="#" class="modal-link" name="cancelAddProject">Cancel</a>
        </div>
        `)
    })

    $('body').on('click', '[name=addProject]',function(){
        api.addProject($('.projects-list'), $('.modal-input').val(), $('.modal-color').val())
    })

    $('body').on('click', '.projects-list-a',function(){
        const projectId = $(this).data().id;
        api.showProjectTasks(projectId, $('.cont-mid'))
    })

    $('body').on('click', '[name=loginBtn]', function() {
        api.login('[name="email"]', '[name="password"]', '[name=loginButton]')
    })

    $('body').on('click', '[name=project]', function() {
        api.showProjectTasks('[name="email"]', '[name="password"]', '[name=loginButton]') //showproject tasks here
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
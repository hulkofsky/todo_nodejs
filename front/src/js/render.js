'use strict'
import $ from 'jquery'
import Handlebars from 'handlebars/dist/handlebars.min'
import Functions from './functions.js'

export default class Render{
    wrapper(){
        return $('.wrapper')
    }

    loadTemplate(url, container, context){
        let template
        $.get(url, function (response) {
            template = Handlebars.compile(response)
            if(context) {
                template = template(context)
            }
            container.html(template)
        })
    }
    createTask(container, data){
        this.loadTemplate('./src/views/createTask.hbs', container, data)
    }
    projects(container, data){
        this.loadTemplate('./src/views/projects.hbs', container, data)
    }

    tasks(container, data){
        this.loadTemplate('./src/views/tasks.hbs', container, data)
    }

    loginPage(){
        this.loadTemplate('./src/views/login.hbs', this.wrapper())
    }

    profilePage(data){
        console.log(data, 'data from render profilepage')
        this.loadTemplate('./src/views/profile.hbs', this.wrapper(), data)
    }

    registerPage(){
        this.loadTemplate('./src/views/register.hbs', this.wrapper())
    }
}
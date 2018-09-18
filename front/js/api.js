const $ = require('jquery')

// import $ from 'jquery'
// import Render from './render'

render = new Render

$(document).ready(function() { 
    
    render.homePage()

    $('body').html(data)
    $.ajax({
        url: "http://localhost:5000/",
        headers: {token: window.localStorage.getItem('token'), userId: window.localStorage.getItem('userId')},
        type: "GET",
        beforeSend: (xhr) => {xhr.setRequestHeader('X-Test-Header', 'test-value');},
        success: (data) => {
            //render.projectPage()
        },
        error: (err) => {
            console.log(err.status, typeof err.status, "error")
            if (err.status == 403){
                render.loginPage()
            }
        },
    })
})
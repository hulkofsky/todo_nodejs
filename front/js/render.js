'use strict';
import $ from 'jquery';
import pug from 'pug'
import Functions from './functions.js';

export default class Render{
    wrapper(){
        return $('.wrapper');
    };

    loadTemplate(url, container, context){  
        $.get(url, function (response) {
            console.log(response)
            let template = pug.compile(response);
            if(context) {
                template = template(context);
            }
            container.html(template);
        });
    }

    homePage(){
        this.loadTemplate('../view/home.pug')
    }

    loginPage(){
        this.loadTemplate('../views/login.pug', this.wrapper());
    }

    registerPage(){
        this.loadTemplate('../views/register.pug', this.wrapper(), captcha);
    }
    
    profilePage(data){
        this.loadTemplate('../views/profile.pug', this.wrapper(), data); 
    }

    registerPage(){
        const functions = new Functions();
        const captcha = {   firstNumber: functions.random(1, 10),
                            lastNumber: functions.random(1, 10)
                        };
        this.loadTemplate('./src/views/register.hbs', this.wrapper(), captcha);
    };//PROFILE PAGE

    recoverPassPage(){
        this.loadTemplate('./src/views/recoverPass.hbs', this.wrapper());
    };//RECOVER PASS PAGE

    profileSettingsPage(containerSelector, data){
        const functions = new Functions();
        const context = {profile: {
                                firstName: data.profile.firstname,
                                lastName: data.profile.lastname,
                                quote: data.profile.quote,
                                photo: data.profile.photo,
                                lived: data.profile.lived,
                                from: data.profile.from,
                                went: data.profile.went
                            }
                        };
        
        const container = $(containerSelector);
        this.loadTemplate('./src/views/profileSettings.hbs', container, context);  
    };//PROFILE SETTINGS

    searchResults(containerSelector, data){
        const container = $(containerSelector);

        this.loadTemplate('./src/views/searchResults.hbs', container, data);
    };//SEARCH RESULTS

    allFriendsOrEnemies(containerSelector, data, callback){
        const container = $(containerSelector);
        this.loadTemplate('./src/views/allFriendsOrEnemies.hbs', container, data, callback);
    };//ALL FRIENDS OR ENEMIES
};



var oldRender = {
    loginPage: function () {
        this.createRoute('views/pages/login.hbs', App.wrapper);
    },
  
    profilePage: function (data) {
        var context = {
            firstName: data.profile.firstname,
            lastName: data.profile.lastname
        };
  
        this.createRoute('views/pages/profile.hbs', App.wrapper, context);
    },
  
    registerPage: function () {
      this.createRoute('views/pages/register.hbs', App.wrapper);
    },
  
    albumsPage: function () {
        this.createRoute('views/pages/albums.hbs', App.wrapper);
    },
  
    albumPage: function (album) {
        this.createRoute('views/pages/album.hbs', App.wrapper, album);
    },
  
    navUser: function () {
        this.createRoute('views/modules/header-nav-authorized.hbs', App.header);
    },
  
    navGuest: function () {
        this.createRoute('views/modules/header-nav-unauthorized.hbs', App.header);
    },
  
    addAlbumForm: function () {
        this.createRoute('views/modules/add-album-form.hbs', $('.add-album-container'));
  
        setTimeout(function () {
            $('.add-album-form').slideDown();
        }, 500);
    },
  
    addPhotoForm: function () {
        this.createRoute('views/modules/add-photo-form.hbs', $('.add-photo-container'));
  
        setTimeout(function () {
            $('.add-photo-form').slideDown();
        }, 500);
    },
  
    createRoute: function (url, container, context) {
        var template;
  
        $.get(url, function (response) {
            template = Handlebars.compile(response);
  
            if(context) {
                template = template(context);
            }
            container.html(template);
        });
    }
  };
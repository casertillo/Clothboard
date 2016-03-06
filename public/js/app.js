"use strict";
// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('clothoardApp', ['mainCtrl','homeCtrl','profileCtrl','ngMaterial', 'ngRoute', 'ngMessages', 'dndLists', 'angular-carousel']);
    // Configures Angular routing -- showing the relevant view and controller when needed.
app.config(routes);

function routes($routeProvider, $mdThemingProvider){

    $mdThemingProvider.theme('default')
          .primaryPalette("deep-purple")
          .accentPalette('red')
          .warnPalette('pink');

        // Join Team Control Panel
        $routeProvider.when('/home/:profileid', {
            controller: 'homeCtrl', 
            templateUrl: 'partials/home.html',

            // Find Teammates Control Panel
        }).when('/', {
            controller: 'mainCtrl',
            templateUrl: 'partials/main.html',

            // All else forward to the Join Team Control Panel
        // }).when('/testdrag', {
        //     controller: 'profileCtrl',
        //     templateUrl: 'partials/drag.html',

            //ROUTE TO view public profile
        }).when('/profile/:profileid', {
            controller: 'profileCtrl',
            templateUrl: 'partials/profile.html',

            // All else forward to the Join Team Control Panel
        }).otherwise({redirectTo:'/'})
    };

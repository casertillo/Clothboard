// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('clothoardApp', ['mainCtrl','ngMaterial', 'ngRoute', 'ngMessages'])
    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider, $mdThemingProvider){

    $mdThemingProvider.theme('default')
          .primaryPalette("deep-purple")
          .accentPalette('red')
          .warnPalette('pink');

        // Join Team Control Panel
        $routeProvider.when('/katy', {
            controller: 'mainCtrl', 
            templateUrl: 'katy.html',

            // Find Teammates Control Panel
        }).when('/', {
            controller: 'mainCtrl',
            templateUrl: 'partials/main.html',

            // All else forward to the Join Team Control Panel
        }).otherwise({redirectTo:'/'})
    });


// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('clothoardApp', ['mainCtrl','ngMaterial', 'ngRoute'])
    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider, $mdThemingProvider){

  $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });

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


var mainCtrl = angular.module('mainCtrl', ['ngMaterial']);

mainCtrl.controller('mainCtrl', function($scope, $log, $http, $rootScope){

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };


});
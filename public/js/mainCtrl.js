"use strict";
var mainCtrl = angular.module('mainCtrl', ['ngMaterial', 'ngAnimate']);

//DIrective to verify that values are the same
mainCtrl.directive('match', checkmismatch);

function checkmismatch($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {        
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
      });
    }
  };
};

//COntroller from the main page
mainCtrl.controller('mainCtrl', mainFunction);

function mainFunction($scope, $log, $http, $rootScope, $timeout, $mdDialog, $mdMedia, $anchorScroll, $location){

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

   var INTERVAL = 2500,
        slides = [
          {id:"image00", src:"images/H.svg"},
          {id:"image01", src:"images/shirtw.png"},
          {id:"image02", src:"images/shirt.png"},
          {id:"image03", src:"images/dress.png"},
          {id:"image04", src:"images/suit.png"},
            {id:"image04", src:"images/jeans.png"},
            {id:"image04", src:"images/coat.png"}
        ];

    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function loadSlides() {
        $timeout(nextSlide, INTERVAL);
    }
   
    $scope.slides = slides;
    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;

    loadSlides();

  $scope.showSignIn = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'mainCtrl',
      templateUrl: 'partials/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.showLogIn = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'mainCtrl',
      templateUrl: 'partials/dialog2.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  }

  $scope.newaccount = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.cancel();
    $mdDialog.show({
      controller: 'mainCtrl',
      templateUrl: 'partials/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });    
  }

  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };
};
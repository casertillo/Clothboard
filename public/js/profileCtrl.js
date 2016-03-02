"use strict";
var profileCtrl = angular.module('profileCtrl', ['ngMaterial', 'ngAnimate']);

//SLIDER DIRECTIVE
    profileCtrl.directive('createSlider', slider);
    function slider($interval) {
        return {
            restrict: 'A',
            scope: {
                links: '=urls', current: '=', list: '=', item:'=',
            },
            /* Allows have the index and the current image*/
            template: '<ul class="slides" effect-slider>'+
                            '<li ng-repeat="url in links track by $index"  ng-style="{width: 100/links.length + \'%\'}">'+
                                '<img ng-src="{{url}}"/>'+
                            '</li>'+
                        '</ul>'+
                        '<div class="iconsleft">'+
                            '<md-button class="md-fab md-mini" aria-label="Left" ng-click="moveLeft()">'+
                                '<md-icon md-svg-src="images/left.svg"></md-icon>'+
                            '</md-button>'+
                        '</div>'+
                        '<div class="iconsright">'+
                            '<md-button class="md-fab md-mini" aria-label="Right" ng-click="moveRight()">'+
                                '<md-icon md-svg-src="images/right.svg"></md-icon>'+
                            '</md-button>'+
                        '</div>'+
                        '<div class="iconclear">'+
                            '<md-button class="md-icon-button" aria-label="Clean" ng-click="clear()">'+
                                '<md-icon md-svg-src="images/clear.svg"></md-icon>'+
                            '</md-button>'+
                        '</div>'
                        ,
                        
            controller: function($scope, $element, $attrs, $log){
                $scope.moveRight = function(){
                    if(angular.isUndefined($scope.current))
                    {
                        $scope.current = 0;
                    }

                    if($scope.current !== $scope.links.length - 1)
                    {
                        $scope.current++;
                    } 
                    else
                    {
                        $scope.current = 0;
                    }
                }
                $scope.moveLeft = function(){
                    if(angular.isUndefined($scope.current))
                    {
                        $scope.current = 0;
                    }
                    if($scope.current !== 0)
                    {
                        $scope.current--;
                    } 
                    else
                    {
                        $scope.current = $scope.links.length - 1;
                    }
                }
                
                $scope.clear = function(){
                    var count = 0;
                    angular.forEach($scope.list, function(value, key){
                        if(value.$$hashKey == $scope.item.$$hashKey)
                        {
                           $scope.list.splice(count, 1); 
                        }
                        count++;
                    });                    
                }
            }, 
            link: function (scope, elem, attrs) {
                elem.css('width', scope.links.length*100 + '%');
            }
        };
    };

    profileCtrl.directive('effectSlider', effectsSlider);
    function effectsSlider(){
        return{
            restrict: 'A',
            link: function(scope, elem, attrs){
                scope.$watch('current', function(){
                    elem.css('transform', 'translateX(-' + scope.current * (100 / scope.links.length) + '%)');
                });
            }
        }
    };

profileCtrl.controller('profileCtrl', profileFunction);

function profileFunction($scope, $timeout, $mdSidenav, $log, $http, $rootScope, $filter){
  
  var users = $http.get('users/users.json').success(function(data){
    var user = $filter('filter')(data.users, function (d) {return d._id === '001';})[0];
    $scope.avatar = user.avatar;

    if(user.name.length < 13 && user.lastname.length < 15)
    {
      $scope.usernamedisplay = user.name + ' ' + user.lastname;
    }
    else if($scope.name.length > 13)
    {
      $scope.usernamedisplay = user.name.substr(0,13) + '...';
    }
    else
    {
      $scope.usernamedisplay = user.name;
    }

    $scope.closetnum = user.closets.length;
    $scope.closets = user.closets;
    $scope.catalogs = user.catalogs;

    $scope.models = {
        lists: {"A": [], "B": []}
    };

    angular.forEach($scope.closets, function(value, key){
        var allurls = [];
        angular.forEach(value.images, function(value, key){
             allurls.push(value.url);
         });
      $scope.models.lists.A.push({name: value.name, size: value.images.length, urls: allurls});
    });

  });

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
  
};
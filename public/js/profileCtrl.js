"use strict";
var profileCtrl = angular.module('profileCtrl', ['ngMaterial', 'ngAnimate']);

//SLIDER DIRECTIVE
    profileCtrl.directive('createSlider', slider);
    function slider($interval) {
        return {
            restrict: 'A',
            scope: {
                links: '=urls', current: '=', list: '=', item:'=', removebutton:'=',
            },
            /* Allows have the index and the current image*/
            template: '<ul class="slides" effect-slider>'+
                            '<li ng-repeat="url in links track by $index"  ng-style="{width: 100/links.length + \'%\'}">'+
                                '<img ng-src="{{url}}" style="max-height:100%; height:auto;"/>'+
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
                        '<div ng-class="{iconclear: removebutton}">'+
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

    var COLORS = ['#ffcdd2', '#ef9a9a', '#e57373', '#ff8a80', '#f8bbd0', '#f48fb1', '#ff80ab', '#e1bee7', '#ce93d8', '#ea80fc', '#9fa8da', '#c5cae9', '#64b5f6', '#42a5f5', '#90caf9', '#bbdefb', '#81d4fa','#4fc3f7', '#29b6f6','#26c6da','#80deea','#b2ebf2','#4dd0e1','#4db6ac','#26a69a','#4db6ac','#80cbc4','#81c784','#a5d6a7','#66bb6a','#ffee58','#fbc02d','#fdd835','#f9a825','#f57c00','#fb8c00','#ff7043','#ff8a65','#ffab91','#90a4ae','#b0bec5'];
    
    function randomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

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
        lists: {"Closets": [], "Dnd": [], "Dashboard":[], "Catalogs":[]}
    };

    var friend;
    angular.forEach(user.friends, function(value, key){
        
        friend = $filter('filter')(data.users, function (d) {return d._id === value;})[0];

        angular.forEach(friend.closets, function(value, key){
            var allurls = [];
            angular.forEach(value.images, function(value, key){
                 allurls.push(value.url);
             });
            
            $scope.models.lists.Dashboard.push({
                    name: value.name, 
                    size: value.images.length, 
                    urls: allurls, 
                    color: randomColor(),
                    username: friend.name +' '+ friend.lastname,
                    useravatar: friend.avatar,
                    date: value.dateadded, 
                    friend: friend._id
                });
        });
    });

    angular.forEach($scope.closets, function(value, key){
        var allurls = [];
        angular.forEach(value.images, function(value, key){
             allurls.push(value.url);
         });
        
        $scope.models.lists.Closets.push({name: value.name, size: value.images.length, urls: allurls});
    });

    angular.forEach($scope.catalogs, function(value, key){
        var allurls = [];
        angular.forEach(value.images, function(value, key){
             allurls.push(value.url);
         });
        if(value.name.length > 11)
        {
            value.name = value.name.substr(0,11)+'...';
        }
        $scope.models.lists.Catalogs.push({name: value.name, size: value.images.length, urls: allurls});
    });

  });
    $scope.addToCatalogs = function(catalog)
    {
        if($scope.models.lists.Catalogs.indexOf(catalog) == -1)
        {
            if(catalog.name.length > 11)
            {
                catalog.name = catalog.name.substr(0,11)+'...';
            }
           $scope.models.lists.Catalogs.push(catalog); 
        }
        
    }
    $scope.removeCatalog = function(catalog)
    {
        var index = $scope.models.lists.Catalogs.indexOf(catalog);
        $scope.models.lists.Catalogs.splice(index, 1); 
    }
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
  
};
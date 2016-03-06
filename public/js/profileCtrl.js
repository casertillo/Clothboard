var homeCtrl = angular.module('profileCtrl', ['ngMaterial', 'ngAnimate']);

homeCtrl.controller('profileCtrl', profileFunction);

function profileFunction($scope, $filter, $http, $routeParams, $log){

	var users = $http.get('users/users.json').success(function(data){
	$scope.user = $filter('filter')(data.users, function (d) {return d._id === $routeParams.profileid;})[0];

	    $scope.models = {
        	Closets:[]
    	};

    	angular.forEach($scope.user.closets, function(value, key){
	        var allurls = [];
	        angular.forEach(value.images, function(value, key){
	             allurls.push(value.url);
	         });
	        
	        $scope.models.Closets.push({name: value.name, urls: allurls});
    	});

	});
	
};
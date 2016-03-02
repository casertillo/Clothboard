"use strict";
angular.module('userService', [])
	.factory('userService', userService);

function userService($http){

	var AllUsers = {};	
	return{
		list:function(callback){
			$http.get('users/users.json').success(callback);
		}
	};
};
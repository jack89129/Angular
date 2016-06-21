(function(){
'use strict';

angular
	.module('app')
	.factory('Profile', ProfileService);
	
	ProfileService.$inject = ['$http', '$rootScope', '$timeout', 'BASE_URL'];

	function ProfileService($http, $rootScope, $timeout, BASE_URL) {
		var service = {};

		service.getProfile = getProfile;
		service.saveProfile = saveProfile;
		service.changePassword = changePassword;

		/**
	 	 * @name getProfile
	 	 * @desc get profile
	 	 */
		function getProfile() {
			return $http.get(BASE_URL + '/api/profile/').then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name saveProfile
	 	 * @desc save profile
	 	 */
		function saveProfile(objData) {
			return $http.put(BASE_URL + '/api/profile/', objData).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name changePassword
	 	 * @desc Change password
	 	 */
		function changePassword(oldPwd, newPwd) {
			var objData = {
				old_password: oldPwd,
				new_password: newPwd
			};

			return $http.put(BASE_URL + '/api/profile/change-password/', objData).then(function(response) {
				return response.data;
			});
		}

	 	return service;
	}
})();
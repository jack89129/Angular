(function(){
'use strict';

angular
	.module('app')
	.factory('Company', CompanyService);
	
	CompanyService.$inject = ['$http', '$rootScope', '$timeout', 'BASE_URL'];

	function CompanyService($http, $rootScope, $timeout, BASE_URL) {
		var service = {};

		service.getCompanyList = getCompanyList;
		service.getCompanyDetail = getCompanyDetail;
		service.getCompanyProfile = getCompanyProfile;
		service.updateCompanyProfile = updateCompanyProfile;
		service.createCompanyInfo = createCompanyInfo;
		service.getCompanyFriends = getCompanyFriends;
		service.createCompanyFriend = createCompanyFriend;
		service.deleteCompanyFriend = deleteCompanyFriend;
		service.getCompanyMember = getCompanyMember;		
		service.createCompanyMember = createCompanyMember;
		service.updateCompanyMember = updateCompanyMember;
		service.deleteCompanyMember = deleteCompanyMember;

		/**
	 	 * @name getCompanyList
	 	 * @desc get company list
	 	 */
		function getCompanyList() {
			return $http.get(BASE_URL + '/api/company/list/').then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name getCompanyDetail
	 	 * @desc get company detail
	 	 * @param id: company id
	 	 */
		function getCompanyDetail(id) {
			return $http.get(BASE_URL + '/api/company/list/' + id + '/').then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name getCompanyProfile
	 	 * @desc get company profile
	 	 */
		function getCompanyProfile() {
			return $http.get(BASE_URL + '/api/company/profile/').then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name updateCompanyProfile
	 	 * @desc update company profile
	 	 */
		function updateCompanyProfile(objData) {
			return $http.put(BASE_URL + '/api/company/profile/', objData).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name createCompanyInfo
	 	 * @desc create company info
	 	 */
		function createCompanyInfo() {
			var request = {				
			};

			return $http.post(BASE_URL + '/api/company/info/', request).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name getCompanyFriends
	 	 * @desc get company friends
	 	 */
		function getCompanyFriends() {
			return $http.get(BASE_URL + '/api/company/friends/').then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name createCompanyFriend
	 	 * @desc create company friend
	 	 */
		function createCompanyFriend() {
			var request = {
				
			};

			return $http.post(BASE_URL + '/api/company/friends/', request).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name deleteCompanyFriend
	 	 * @desc delete company friend
	 	 */
		function deleteCompanyFriend() {
			var request = {				
			};

			return $http.delete(BASE_URL + '/api/company/friends/', request).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name getCompanyMember
	 	 * @desc get company member
	 	 */
		function getCompanyMember() {
			return $http.get(BASE_URL + '/api/company/member/').then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name createCompanyMember
	 	 * @desc create company member
	 	 */
		function createCompanyMember() {
			var request = {				
			};

			return $http.post(BASE_URL + '/api/company/member/', request).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name updateCompanyMember
	 	 * @desc update company member
	 	 */
		function updateCompanyMember() {
			var request = {
				
			};

			return $http.put(BASE_URL + '/api/company/member/', request).then(function(response) {
				return response.data;
			});				
		}

		/**
	 	 * @name getCompanyList
	 	 * @desc get company list
	 	 */
		function deleteCompanyMember() {
			var request = {				
			};

			return $http.delete(BASE_URL + '/api/company/member/', request).then(function(response) {
				return response.data;
			});				
		}
		
	 	return service;
	}
})();
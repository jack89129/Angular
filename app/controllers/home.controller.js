'use strict';

angular
    .module('app')
    .controller('HomeController', ['$scope', '$rootScope', '$uibModal', 'Company',
            function($scope, $rootScope, $uibModal, Company) {
    	$rootScope.hasMenuBG = false;

        $scope.companyProfile = {};
        $scope.companyList = [];

        Company
            .getCompanyList()
            .then(function(response) {                
                $scope.companyList = response.results;
                console.log("Company List:", response);
            });
        
        Company
            .getCompanyProfile()
            .then(function(response) {                
                $scope.companyProfile = response;
                console.log('Company profile:', $scope.companyProfile);                
            });

    	$scope.editFriends = function () {
    		var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/edit-friends.modal.tpl.html',
    			controller: 'EditFriendsModalCtrl',
    			windowClass: 'vcenter-modal transparent-modal',
                backdrop: 'static',
    			backdropClass: 'transparent-backdrop'
    		});
    		modalInstance.result.then(
    			function(data) {

    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};
    }]);
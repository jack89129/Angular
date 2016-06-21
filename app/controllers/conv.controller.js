'use strict';

angular
    .module('app')
    .controller('ConvController', ['$scope', '$rootScope', '$uibModal', function($scope, $rootScope, $uibModal) {
    	$rootScope.hasMenuBG = true;
        $rootScope.hasFooter = false;

    	
    }])
    .controller('ConvMngController', ['$scope', '$rootScope', '$uibModal', function($scope, $rootScope, $uibModal) {
        $rootScope.hasMenuBG = true;
        $rootScope.hasFooter = false;

        
    }]);
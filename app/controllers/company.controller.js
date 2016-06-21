'use strict';

angular
    .module('app')
    .controller('CompanyController', ['$scope', '$rootScope', '$timeout', 'Company', 'Common', 
            function($scope, $rootScope, $timeout, Company, Common) {
    	$rootScope.hasMenuBG = true;

    	$scope.isSearchDropdownOpened = false;
        $scope.isOnMap = false;
        $scope.companyList = {};
        $scope.filters = [];
        $scope.allFiltered = false;

        $scope.industryList = Common.getIndustryList();

        angular.forEach($scope.industryList, function(item) {
            angular.extend(item, {
                filtered: false
            });
        });

        Company
            .getCompanyList()
            .then(function(response) {
                console.log(response);
                $scope.companyList = response;
            }, function(response) {
                console.log(response);
            });

        $scope.selectItem = function(item) {
            item.filtered = !item.filtered;
        };

        $scope.selectAllItem = function() {
            $scope.allFiltered = !$scope.allFiltered;

            angular.forEach($scope.industryList, function(item) {
                if ($scope.allFiltered)
                    item.filtered = true;
                else
                    item.filtered = false;
            });          
        };

        $scope.applyFilter = function() {
            $scope.filters = [];
            angular.forEach($scope.industryList, function(item) {
                if (item.filtered) {
                    $scope.filters.push(item);
                }
            });
        };

        $scope.resetFilter = function() {
            $scope.allFiltered = false;
            angular.forEach($scope.industryList, function(item) {
                item.filtered = false;
            });  
        };

        $scope.deleteFilter = function(item) {
            for (var i=0; i<$scope.filters.length; i++) {
                if (item.id === $scope.filters[i].id) {
                    $scope.filters.splice(i, 1);
                }
            }

            angular.forEach($scope.industryList, function(itm) {
                if (item.id === itm.id) {
                    itm.filtered = false;
                }
            });
        };

        $scope.deleteAllFilters = function() {
            $scope.filters = [];
            $scope.allFiltered = false;

            angular.forEach($scope.industryList, function(itm) {
                itm.filtered = false;
            });
        };

        $scope.toggleSearchDropdown = function (toggle) {
            if(toggle) {
                $scope.isSearchDropdownOpened = toggle;
                return;
            }
            $scope.isSearchDropdownOpened = !$scope.isSearchDropdownOpened;
        };

        $scope.toggleOnMap = function () {
            $scope.isOnMap = !$scope.isOnMap;
        };

        var cities = [{
            city: 'Toronto',
            desc: 'This is the best city in the world!',
            lat: 43.7000,
            long: -79.4000
        }, {
            city: 'New York',
            desc: 'This city is aiiiiite!',
            lat: 40.6700,
            long: -73.9400
        }, {
            city: 'Chicago',
            desc: 'This is the second best city in the world!',
            lat: 41.8819,
            long: -87.6278
        }, {
            city: 'Los Angeles',
            desc: 'This city is live!',
            lat: 34.0500,
            long: -118.2500
        }, {
            city: 'Las Vegas',
            desc: 'Sin City...\'nuff said!',
            lat: 36.0800,
            long: -115.1522
        }];

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };        

        $timeout(function() {
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.markers = [];

            var infoWindow = new google.maps.InfoWindow();

            var createMarker = function(info) {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.city
                });
                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);
            }

            for (var i = 0; i < cities.length; i++) {
                createMarker(cities[i]);
            }

            $scope.openInfoWindow = function(e, selectedMarker) {
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };
        }, 500);
    }])
    .controller('CompanyProfileController', ['$scope', '$rootScope', '$uibModal', '$route', 'Company', 
            function($scope, $rootScope, $uibModal, $route, Company) {
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
            .getCompanyDetail($route.current.params.id)
            .then(function(response) {
            console.log(response);                
                $scope.companyProfile = response;
                console.log('Company profile:', $scope.companyProfile);                
            });

        $scope.createConv = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/create-conv.modal.tpl.html',
                controller: 'CreateConvModalCtrl',
                windowClass: 'vcenter-modal auto-height'
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
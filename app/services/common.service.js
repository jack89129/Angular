(function(){
'use strict';

angular
    .module('app')
    .factory('Common', CommonService);
    
    CommonService.$inject = ['$http', '$rootScope', '$timeout', 'BASE_URL'];

    function CommonService($http, $rootScope, $timeout, BASE_URL) {
        var service = {};

        service.getIndustryList = getIndustryList;
        service.getDepartList = getDepartList;
        service.getCompanySizeList = getCompanySizeList;
        service.getCountryList = getCountryList;
        service.getStateList = getStateList;

        /**
         * @name getIndustryList
         * @desc get company list
         */
        function getIndustryList() {
            var list = [
                {
                    id: 1,
                    name: 'Science'
                },
                {
                    id: 2,
                    name: 'Technology'
                },
                {
                    id: 3,
                    name: 'Internet'
                }
            ];
            return list;
            /*
            return $http.get(BASE_URL + '/api/company/list/').then(function(response) {
                return response.data;
            });*/             
        }

        function getDepartList() {
            var list = [
                {
                    id: 1,
                    name: 'Management'
                },
                {
                    id: 2,
                    name: 'PR Department'
                },
                {
                    id: 3,
                    name: 'Dev Department'
                },
                {
                    id: 4,
                    name: 'UX Department'
                },
                {
                    id: 5,
                    name: 'Law Department'
                },
                {
                    id: 6,
                    name: 'Framer VR Department'
                },
                {
                    id: 7,
                    name: 'UI Department'
                }
            ];
            return list;
        }

        function getCompanySizeList() {
            var list = [
                {
                    id: 1,
                    name: '1-10 employees'
                },
                {
                    id: 2,
                    name: '11-50 employees'
                },
                {
                    id: 3,
                    name: '51-100 employees'
                },
                {
                    id: 4,
                    name: '101-200 employees'
                },
                {
                    id: 5,
                    name: '201-500 employees'
                },
                {
                    id: 6,
                    name: '501-1000 employees'
                },
            ];
            return list;
        }

        function getCountryList() {
            var list = [
                {
                    id: 1,
                    name: 'Netherlands'
                },
                {
                    id: 2,
                    name: 'United States'
                },
                {
                    id: 3,
                    name: 'Sweden'
                }
            ];
            return list;
        }          

        function getStateList() {
            var list = [
                {
                    id: 1,
                    name: 'Alabama'
                },
                {
                    id: 2,
                    name: 'Alaska'
                },
                {
                    id: 3,
                    name: 'Austin'
                },
                {
                    id: 4,
                    name: 'Arlington'
                },
                {
                    id: 5,
                    name: 'Tampa'
                },
                {
                    id: 6,
                    name: 'Aurora'
                }
            ];
            return list;
        }  
        
        return service;
    }
    
})();
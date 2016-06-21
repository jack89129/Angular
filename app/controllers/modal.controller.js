'use strict';

angular
    .module('app')
    .controller('SigninModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'UserStorage', 'Auth', 
            function($scope, $uibModalInstance, $uibModal, UserStorage, Auth) {
        $scope.signinCompanyName = '';
        $scope.signupCompanyName = '';

        $scope.signinNext = function () {
            if ($scope.signInForm.$valid) {
                UserStorage.setCompany($scope.signinCompanyName);                
                $uibModalInstance.close();
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modal/signin-email.modal.tpl.html',
                    controller: 'SigninEmailModalCtrl',
                    windowClass: 'vcenter-modal'
                });
                modalInstance.result.then(
                    function(data) {

                    },
                    function() {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );    
            }    		
    	};

    	$scope.signupNext = function () {
            if ($scope.signUpForm.$valid) {
                UserStorage.setCompany($scope.signupCompanyName);
                $uibModalInstance.close();
    			var modalInstance = $uibModal.open({
        			animation: true,
        			templateUrl: 'views/modal/register-company.modal.tpl.html',
        			controller: 'RegisterCompanyModalCtrl',
        			windowClass: 'vcenter-modal'
        		});
        		modalInstance.result.then(
        			function(data) {

        			},
        			function() {
        				console.info('Modal dismissed at: ' + new Date());
        			}
    			);
            }
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('SigninEmailModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'UserStorage', 'Auth', 
            function($scope, $uibModalInstance, $uibModal, UserStorage, Auth) {
        $scope.companyName = UserStorage.getCompany();
        $scope.email = '';

    	$scope.back = function () {
			$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/signin.modal.tpl.html',
    			controller: 'SigninModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {

    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.continue = function () {
            if($scope.signInForm.$valid) {
                UserStorage.setEmail($scope.email);
                $uibModalInstance.close();
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modal/signin-pwd.modal.tpl.html',
                    controller: 'SigninPwdModalCtrl',
                    windowClass: 'vcenter-modal'
                });
                modalInstance.result.then(
                    function(data) {
                    },
                    function() {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            }    		
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('SigninPwdModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', '$uibModal', '$location', 'localStorageService', 'UserStorage', 'Auth', 'Profile', 
            function($scope, $rootScope, $uibModalInstance, $uibModal, $location, localStorageService, UserStorage, Auth, Profile) {
        $scope.pwd = '';

    	$scope.back = function () {
			$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/signin-email.modal.tpl.html',
    			controller: 'SigninEmailModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {
    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.signinWithDiff = function () {
            /*
            $uibModalInstance.close();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/signin-email.modal.tpl.html',
                controller: 'SigninEmailModalCtrl',
                windowClass: 'vcenter-modal'
            });
            modalInstance.result.then(
                function(data) {
                },
                function() {
                    console.info('Modal dismissed at: ' + new Date());
                }
            );*/
            Auth
                .sendMagic(UserStorage.getCompany(), UserStorage.getEmail())
                .then(success, error);

            function success(response) {
                $uibModalInstance.close();
                console.log(response);
            }

            function error(response) {
                console.log(response);
            }

    	};

    	$scope.signin = function () {
            if ($scope.signInForm.$valid) {
                Auth
                    .signin(UserStorage.getCompany(), UserStorage.getEmail(), $scope.pwd)
                    .then(success, error);
            }

            function success(response) {
                $uibModalInstance.close();
                Auth.setCredentials(UserStorage.getCompany(), UserStorage.getEmail(), response.token);

                Profile
                    .getProfile()
                    .then(success, error);

                function success(response) {
                    $rootScope.isAuthorized = true;
                    $rootScope.globals.currentUser.profile = response;
                    localStorageService.set('globals', $rootScope.globals);
                    $location.path('/home');
                }

                function error(response) {

                }                
            }

            function error(response) {
                console.log(response);
            }
    	};

    	$scope.forgotPwd = function () {
    		$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/reset-pwd.modal.tpl.html',
    			controller: 'ResetPwdModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {
    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('ResetPwdModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'UserStorage', 'Auth', 
            function($scope, $uibModalInstance, $uibModal, UserStorage, Auth) {
        $scope.email = '';

        $scope.back = function () {
			$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/signin-pwd.modal.tpl.html',
    			controller: 'SigninPwdModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {
    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.resetPwd = function () {
            if ($scope.resetPwdForm.$valid) {
                Auth.
                    sendResetPwdRequest(UserStorage.getCompany(), $scope.email)
                    .then(success, error);

                function success(response) {
                    $uibModalInstance.close();
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/change-pwd.modal.tpl.html',
                        controller: 'ChangePwdModalCtrl',
                        windowClass: 'vcenter-modal',
                        resolve: {
                            key: function () {
                                return response.key;
                            }
                        }
                    });
                    modalInstance.result.then(
                        function(data) {
                        },
                        function() {
                            console.info('Modal dismissed at: ' + new Date());
                        }
                    );
                }

                function error(response) {
                    console.log(response);
                }
            }			
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('ChangePwdModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'UserStorage', 'Auth', 'key', 
            function($scope, $uibModalInstance, $uibModal, UserStorage, Auth, key) {
    	$scope.back = function () {
			$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/reset-pwd.modal.tpl.html',
    			controller: 'ResetPwdModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {
    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.changePwd = function () {
            if (($scope.changePwdForm.$valid) && ($scope.pwd === $scope.confirmPwd)) {
                Auth
                    .setNewPwd(key, $scope.pwd)
                    .then(success, error);

                function success(response) {
                    $uibModalInstance.close();
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/signin-pwd.modal.tpl.html',
                        controller: 'SigninPwdModalCtrl',
                        windowClass: 'vcenter-modal'
                    });
                    modalInstance.result.then(
                        function(data) {
                        },
                        function() {
                            console.info('Modal dismissed at: ' + new Date());
                        }
                    );
                }

                function error(response) {
                    console.log(response);
                }
            }
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('RegisterCompanyModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'UserStorage', 'Auth',  
            function($scope, $uibModalInstance, $uibModal, UserStorage, Auth) {
        $scope.email = '';

    	$scope.back = function () {
			$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/signin.modal.tpl.html',
    			controller: 'SigninModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {
    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.continue = function () {
            if ($scope.registerForm.$valid) {
                UserStorage.setEmail($scope.email);
                $uibModalInstance.close();
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modal/register-pwd.modal.tpl.html',
                    controller: 'RegisterPwdModalCtrl',
                    windowClass: 'vcenter-modal'
                });
                modalInstance.result.then(
                    function(data) {
                    },
                    function() {
                        console.info('Modal dismissed at: ' + new Date());
                    }
                );
            }			
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('RegisterPwdModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', '$uibModal', '$location', 'UserStorage', 'Auth',
            function($scope, $rootScope, $uibModalInstance, $uibModal, $location, UserStorage, Auth) {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.pwd = '';
        $scope.confirmPwd = '';

    	$scope.back = function () {
			$uibModalInstance.close();
			var modalInstance = $uibModal.open({
    			animation: true,
    			templateUrl: 'views/modal/register-company.modal.tpl.html',
    			controller: 'RegisterCompanyModalCtrl',
    			windowClass: 'vcenter-modal'
    		});
    		modalInstance.result.then(
    			function(data) {
    			},
    			function() {
    				console.info('Modal dismissed at: ' + new Date());
    			}
			);
    	};

    	$scope.createCompany = function () {			
            if (($scope.registerForm.$valid) && ($scope.pwd === $scope.confirmPwd)) {
                Auth
                    .signup(UserStorage.getCompany(), UserStorage.getEmail(), $scope.pwd)
                    .then(success, error);
            }

            function success(response) {                                
                $location.path('/home');
            }

            function error(response) {
                console.log(response);
            }
    	};

    	$scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('EditFriendsModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'UserStorage', 'Auth', 
            function($scope, $uibModalInstance, $uibModal, UserStorage, Auth) {
        $scope.isSearchDropdownOpened = false;
        
        $scope.toggleSearchDropdown = function () {
            $scope.isSearchDropdownOpened = !$scope.isSearchDropdownOpened;
        };        

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('CreateConvModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 
            function($scope, $uibModalInstance, $uibModal) {        
        
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
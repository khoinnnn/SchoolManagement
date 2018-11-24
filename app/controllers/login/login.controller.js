(function () {
	'use strict';

	angular
		.module('app')
		.controller('login', login);

	login.$inject = ['$scope', '$rootScope', '$log', '$http', '$cookies', '$location', 'api', 'func', 'client', 'seed'];

	function login($scope, $rootScope, $log, $http, $cookies, $location, api, func, client, seed) {
		activate();

		/* Functions */
		function activate() {
			$scope.login = {};
		}

		/* Events */
		$scope.onsubmit_fLogin = () => {
			func.closeSubmit();
			if ($scope.login.Username === "admin" && $scope.login.Password === "Admin@123") {
				$rootScope.isAuthorized = true;

				// Set token to cookies
				$cookies.put("token", "token");
				$cookies.put("username", "admin");
				
				$location.path("/dashboard");
			}
			else {
				func.openSubmit();
				func.showToast("Sai tên đăng nhập hoặc mật khẩu", "warning");
			}
		};
	}

})();

(function () {
	'use strict';

	angular
		.module('app')
		.run(['$rootScope', '$log', '$cookies', '$location', '$translate', '$templateCache', 'seed', 'func', 'client', 'api',
			function ($rootScope, $log, $cookies, $location, $translate, $templateCache, seed, func, client, api) {
				$rootScope.seed = seed;
				$rootScope.func = func;

				/* Default values */
				$rootScope.defaultImageUrl = "https://www.qatarliving.com/sites/all/themes/qatarliving_v3/images/avatar.jpeg";

				$rootScope.$on('$viewContentLoaded', function () {
					$templateCache.removeAll();
				});

				$rootScope.$on('$routeChangeStart', function () {
					let token = $cookies.get("token");

					if (!!token) {
						$rootScope.isAuthorized = true;
						if ($location.path().includes("login"))
							$location.path("/dashboard");
					}
					else {
						$rootScope.isAuthorized = false;
						$cookies.remove("token");
						$location.path("/login");
					}
				});
			}]);

})();

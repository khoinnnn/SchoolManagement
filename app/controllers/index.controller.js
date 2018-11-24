(function () {
	'use strict';

	angular
		.module('app')
		.controller('index', index);

	index.$inject = ['$scope', '$rootScope', '$log', '$cookies', '$location', '$translate', '$templateCache', 'client', 'api', 'seed', 'func'];

	function index($scope, $rootScope, $log, $cookies, $location, $translate, $templateCache, client, api, seed, func) {
		activate();
		
		/* Functions */
		function activate() {}

		/* Lists */
		$rootScope.departments = [];
		$rootScope.staffs = [];
		$rootScope.overtimes = [];
		$scope.allowances = [];
		$rootScope.cities = [];
		$rootScope.districts = [];
		$rootScope.wards = [];
		
		/* Anonymous Functions */
		$rootScope.getDepartments = (callback) => {
			let requestApi = api.Dept.Base;
			client.Get(requestApi).then(response => {
				$rootScope.departments = response;
				if (!!callback)
					callback();
			}).catch(ex => {
				$log.info(ex);
			});
		}

		$rootScope.getStaffs = () => {
			let requestApi = api.Staff.Base;
			client.Get(requestApi).then(response => {
				$rootScope.staffs = response;
			}).catch(ex => {
				$log.info(ex);
			});
		}

		$rootScope.getOvertimes = () => {
			let requestApi = api.Overtime.Base;
			client.Get(requestApi).then(response => {
				$rootScope.overtimes = response;
			}).catch(ex => {
				$log.info(ex);
			});
		};

		$rootScope.getAllowances = () => {
			let requestApi = api.Allowance.Base;
			client.Get(requestApi).then(response => {
				$scope.allowances = response;
			}).catch(ex => {
				$log.info(ex);
			});
		}

		$rootScope.getCities = () => {
			let requestApi = api.Location.City;
			client.Get(requestApi).then(response => {
				$rootScope.cities = response;
			}).catch(ex => {
				$log.info(ex);
			});
		};

		$rootScope.getDistricts = (cityId) => {
			if (!cityId) {
				$rootScope.districts = [];
				$rootScope.wards = [];
				return;
			}

			let requestApi = api.Location.District.concat("?cityId=", cityId);
			client.Get(requestApi).then(response => {
				$rootScope.districts = response;
			}).catch(ex => {
				$log.info(ex);
			});
		};

		$rootScope.getWards = (districtId) => {
			if (!districtId) {
				$rootScope.wards = [];
				return;
			} 

			let requestApi = api.Location.Ward.concat("?districtId=", districtId);
			client.Get(requestApi).then(response => {
				$rootScope.wards = response;
			}).catch(ex => {
				$log.info(ex);
			});
		};

		/* Functions */
		function cleanCookies() {
			$rootScope.user = {};
			$cookies.remove("token");
			$cookies.remove("username");
		}

		/* Events */
		$scope.onsubmit_fLogout = () => {
			func.closeSubmit();
			cleanCookies();
			$location.path("/login");
			func.openSubmit();
			func.hideModal();
		};
	}

})();

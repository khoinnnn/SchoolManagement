(function () {
	'use strict';

	angular
		.module('app')
		.directive('logoutModal', () => {
			return {
				templateUrl: 'app/controllers/logout/logoutModal.html'
			};
		});

})();
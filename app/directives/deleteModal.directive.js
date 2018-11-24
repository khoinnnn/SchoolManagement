(function () {
	'use strict';

	angular
		.module('app')
		.directive('deleteModal', () => {
			return {
				templateUrl: 'app/controllers/0/deleteModal.html'
			};
		});

})();
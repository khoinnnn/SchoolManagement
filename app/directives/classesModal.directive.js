(function () {
	'use strict';

	angular
		.module('app')
		.directive('classesModal', () => {
			return {
				templateUrl: 'app/controllers/classes/classesModal.html'
			};
		});

})();
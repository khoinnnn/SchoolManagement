(function () {
	'use strict';

	angular
		.module('app')
		.directive('subjectsModal', () => {
			return {
				templateUrl: 'app/controllers/subjects/subjectsModal.html'
			};
		});

})();
(function () {
	'use strict';

	angular
		.module('app')
		.directive('classesSubjectsModal', () => {
			return {
				templateUrl: 'app/controllers/classes/classesSubjectsModal.html'
			};
		});

})();
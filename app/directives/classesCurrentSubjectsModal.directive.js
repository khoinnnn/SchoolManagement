(function () {
	'use strict';

	angular
		.module('app')
		.directive('classesCurrentSubjectsModal', () => {
			return {
				templateUrl: 'app/controllers/classes/classesCurrentSubjectsModal.html'
			};
		});

})();
(function () {
	'use strict';

	angular
		.module('app')
		.controller('classesSchedules', classesSchedules);

		classesSchedules.$inject = ['$scope', '$rootScope', '$log', '$http', '$location', 'api', 'func', 'client', 'seed'];

	function classesSchedules($scope, $rootScope, $log, $http, $location, api, func, client, seed) {
		activate();

		/* Lists */
		$scope.classes = [];

		/* Functions */
		function activate() {
			getClasses(() => {
				getSubjects(() => {
					getClassesSubjects();
				});
			});
		}

		function getSubjects(callback) {
			let requestApi = api.Subjects.GetAll;
			client.Get(requestApi).then(response => {
				if (!!response) {
					$scope.subjects = response.records;
					$scope.subjects.forEach(item => {
						item.Sub_Id = Number(item.Sub_Id);
						item.Sub_Lessons = Number(item.Sub_Lessons);
						item.Sub_CreditTheory = Number(item.Sub_CreditTheory);
						item.Sub_CreditPractice = Number(item.Sub_CreditPractice);
						item.Sub_CreditExercise = Number(item.Sub_CreditExercise);
					});

					if (!!callback)
						callback();
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getClasses(callback) {
			let requestApi = api.Classes.GetAll;
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.classes = response.records;
					$scope.classes.forEach(item => {
						item.Cla_Id = Number(item.Cla_Id);
						item.Cla_SchoolYear = Number(item.Cla_SchoolYear);
					});

					if (!!callback)
						callback();
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getClassesSubjects() {
			let requestApi = api.ClassesSubjects.GetAll;
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.classesSubjects = response.records;
					$scope.classesSubjects.forEach(item => {
						item.ClaSub_Subjects = $scope.subjects.filter(x => item.ClaSub_SubjectIds.includes(x.Sub_Id));
						item.ClaSub_Id = Number(item.ClaSub_Id);
						item.ClaSub_ClassId = Number(item.ClaSub_ClassId);
						item.ClaSub_Semester = Number(item.ClaSub_Semester);
					});

					$scope.classes.forEach(item => {
						item.Cla_ClassesSubjects = $scope.classesSubjects.filter(x => x.ClaSub_ClassId === item.Cla_Id);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}
	}

})();

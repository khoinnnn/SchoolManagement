(function () {
	'use strict';

	angular
		.module('app')
		.controller('students', students);

		students.$inject = ['$location', '$scope', '$rootScope', '$routeParams', '$log', 'api', 'client', 'func', 'seed'];

	function students($location, $scope, $rootScope, $routeParams, $log, api, client, func, seed) {
		activate();

		/* Lists */
		$scope.students = [];
		$scope.classes = [];

		/* Functions */
		function activate() {
			getStudents();
			getClasses();
		}

		function getClasses() {
			let requestApi = api.Classes.GetAll;
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.classes = response.records;
					$scope.classes.forEach(item => {
						item.Cla_Id = Number(item.Cla_Id);
						item.Cla_SchoolYear = Number(item.Cla_SchoolYear);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getStudents() {
			let requestApi = api.Students.GetAll;
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.students = response.records;

					// Filter if students in class
					if(!!$routeParams.Cla_Id)
						$scope.students = $scope.students.filter(x => x.Stu_ClassId === $routeParams.Cla_Id);

					$scope.students.forEach(item => {
						item.Stu_Id = Number(item.Stu_Id);
						item.Stu_ClassId = Number(item.Stu_ClassId);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		/* Events */
		$scope.takeImagePath = (imageName) => {
			return !!imageName ? "files/".concat(imageName) : $rootScope.defaultImageUrl;
		};

		$scope.onclick_row = (item) => {
			$scope.student = angular.copy(item);
		};

		$scope.onclick_btnCreate = () => {
			$location.path("/students/create");
		};

		$scope.onclick_btnAction = (action, item) => {
			switch (action) {
				case "Edit":
					$location.path("/students/".concat(item.Stu_Id, "/update"));
					break;
				case "Delete":
					$rootScope.modalTitle = 'Xóa';
					$('#modalDelete').modal('show');
					break;
				default:
					break;
			}
		};

		$scope.onsubmit_fDelete = () => {
			func.closeSubmit();
			let data = $scope.student;
			let requestApi = api.Students.Delete;
			client.Delete(requestApi, data).then(response => {
				getStudents();
				func.openSubmit();
				func.hideModal();
			}).catch(ex => {
				$log.info(ex);
				func.openSubmit();
			});
		};
	}

})();

(function () {
	'use strict';

	angular
		.module('app')
		.controller('classes', classes);

		classes.$inject = ['$scope', '$rootScope', '$log', '$http', '$location', 'api', 'func', 'client', 'seed'];

	function classes($scope, $rootScope, $log, $http, $location, api, func, client, seed) {
		activate();

		/* Lists */
		$scope.classes = [];
		$scope.students = [];
		$scope.subjects = [];
		$scope.classesSubjects = [];
		$scope.currentSubjects = [];

		/* Functions */
		function activate() {
			getClasses();
			getStudents();

			getSubjects(() => {
				getClassesSubjects();
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
					$scope.students.forEach(item => {
						item.Stu_Id = Number(item.Stu_Id);
						item.Stu_ClassId = Number(item.Stu_ClassId);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getCurrentSemester(currentYear, schoolYear) {
			if(currentYear >= schoolYear) {
				let result = currentYear - schoolYear;
				if(result > 5) return 0; // Out
				else if(result === 5) return 9; // Last
				else if(result === 0) return 1; // First
				else return result * 2;
			}
			else
				return 0; // Not yet
		}

		function getClasses() {
			let requestApi = api.Classes.GetAll;
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.classes = response.records;
					$scope.classes.forEach(item => {
						item.Cla_Id = Number(item.Cla_Id);
						item.Cla_SchoolYear = Number(item.Cla_SchoolYear);
						item.Cla_CurrentSemester = getCurrentSemester(func.getCurrentYear(), item.Cla_SchoolYear);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		/* Events */
		$scope.onclick_btnSetSubjects = (item) => {
			$location.path("classes/".concat(item.Cla_Id, "/set-subjects"));
		};

		$scope.onclick_btnStudents = (item) => {
			$location.path("classes/".concat(item.Cla_Id, "/students"));
		};

		$scope.onclick_btnClassesSchedules = () => {
			$location.path("classes-schedules");
		};

		$scope.onclick_row = (item) => {
			$scope.isCreate = false;
			$scope.class = angular.copy(item);
		};

		$scope.onclick_btnCreate = () => {
			$scope.isCreate = true;
			$rootScope.modalTitle = "Thêm mới";

			$scope.class = {};
			$scope.class.Cla_Name = null;
			$scope.class.Cla_SchoolYear = func.getCurrentYear();
		};

		$scope.onclick_btnUpdate = () => {
			$scope.isCreate = false;
			$rootScope.modalTitle = "Chỉnh sửa";
		};

		$scope.onclick_btnDelete = () => {
			$rootScope.modalTitle = "Xóa";
		};

		$scope.onclick_btnCurrentSubjects = (item) => {
			$scope.class = angular.copy(item);
			$rootScope.modalTitle = "Môn HK".concat($scope.class.Cla_CurrentSemester);

			$scope.currentSubjects = [];
			$scope.currentSubjects = $scope.classesSubjects.filter(x => x.ClaSub_ClassId === $scope.class.Cla_Id && x.ClaSub_Semester === $scope.class.Cla_CurrentSemester)
															.map(y => y.ClaSub_Subjects)[0];
		};

		$scope.onsubmit_fForm = () => {
			func.closeSubmit();
			let data = angular.copy($scope.class);

			if ($scope.isCreate) {
				let requestApi = api.Classes.Insert;
				client.Post(requestApi, data).then(response => {
					getClasses();
					func.openSubmit();
					func.hideModal();
				}).catch(ex => {
					$log.info(ex);
					func.openSubmit();
				});
			}
			else {
				let requestApi = api.Classes.Update;
				client.Put(requestApi, data).then(response => {
					getClasses();
					func.openSubmit();
					func.hideModal();
				}).catch(ex => {
					$log.info(ex);
					func.openSubmit();
				});
			}
		};

		$scope.onsubmit_fDelete = () => {
			if($scope.students.some(x => x.Stu_ClassId === $scope.class.Cla_Id)) {
				func.showToast("Lớp có học sinh, không thể xóa", "warning");
				func.hideModal();
				return;
			}

			func.closeSubmit();
			let data = angular.copy($scope.class);
			let requestApi = api.Classes.Delete;
			client.Delete(requestApi, data).then(response => {
				getClasses();
				func.openSubmit();
				func.hideModal();
			}).catch(ex => {
				$log.info(ex);
				func.openSubmit();
			});
		};
	}

})();

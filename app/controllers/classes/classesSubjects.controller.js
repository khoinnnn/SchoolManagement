(function () {
	'use strict';

	angular
		.module('app')
		.controller('classesSubjects', classesSubjects);

		classesSubjects.$inject = ['$scope', '$rootScope', '$routeParams', '$log', '$http', '$location', 'api', 'func', 'client', 'seed'];

	function classesSubjects($scope, $rootScope, $routeParams, $log, $http, $location, api, func, client, seed) {
		activate();

		/* Lists */
		$scope.classesSubjects = [];
		$scope.subjects = [];

		/* Functions */
		function activate() {
			getSubjects(() => {
				getClassesSubjectsByClassId($routeParams.Cla_Id);
			});
		}

		function getSubjects(callback) {
			let requestApi = api.Subjects.GetAll;
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.subjects = response.records;
					$scope.subjects.forEach(item => {
						item.Sub_Id = Number(item.Sub_Id);
						item.Sub_Lessons = Number(item.Sub_Lessons);
						item.Sub_CreditTheory = Number(item.Sub_CreditTheory);
						item.Sub_CreditPractice = Number(item.Sub_CreditPractice);
						item.Sub_CreditExercise = Number(item.Sub_CreditExercise);
					});
					
					if(!!callback)
						callback();
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getClassesSubjectsByClassId(classId) {
			let requestApi = api.ClassesSubjects.GetByClassId.concat("?classId=", classId);
			client.Get(requestApi).then(response => {
				if(!!response) {
					$scope.classesSubjects = response.records;
					$scope.classesSubjects.forEach(item => {
						// Get classes' name
						item.ClaSub_SubNames = $scope.subjects.filter(x => item.ClaSub_SubjectIds.includes(x.Sub_Id)).map(y => y.Sub_Name);
						item.ClaSub_Id = Number(item.ClaSub_Id);
						item.ClaSub_ClassId = Number(item.ClaSub_ClassId);
						item.ClaSub_Semester = Number(item.ClaSub_Semester);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function resetSubjects() {
			$scope.subjects.forEach(item => {
				item.IsChecked = false;
			});
		}

		/* Events */
		// Check học kỳ đã tồn tại
		$scope.onchange_Semester = (item) => {
			if ($scope.isCreate) {
				if($scope.classesSubjects.some(x => x.ClaSub_Semester === item.ClaSub_Semester)) {
					func.showToast("HK" + item.ClaSub_Semester + " đã tồn tại", "warning");
					item.ClaSub_Semester = "";
				}
			}
			else {
				if($scope.classesSubjects.some(x => x.ClaSub_Semester === item.ClaSub_Semester && x.ClaSub_Id != item.ClaSub_Id)) {
					func.showToast("HK" + item.ClaSub_Semester + " đã tồn tại", "warning");
					item.ClaSub_Semester = "";
				}
			}
		};

		// Check môn học không trùng trong từng học kỳ
		$scope.oncheck_Subject = (item) => {
			if($scope.isCreate) {
				$scope.classesSubjects.forEach(x => {
					if(x.ClaSub_SubjectIds.includes(item.Sub_Id.toString())) {
						func.showToast("HK" + x.ClaSub_Semester +  " đã tồn tại môn học này", "warning");
						item.IsChecked = false;
						return;
					}
				});
			}
			else {
				$scope.classesSubjects.forEach(x => {
					if(x.ClaSub_Id !== $scope.classSubject.ClaSub_Id && x.ClaSub_SubjectIds.includes(item.Sub_Id.toString())) {
						func.showToast("HK" + x.ClaSub_Semester +  " đã tồn tại môn học này", "warning");
						item.IsChecked = false;
						return;
					}
				});
			}
		};

		$scope.onclick_row = (item) => {
			$scope.isCreate = false;

			$scope.classSubject = angular.copy(item);
		};

		$scope.onclick_btnCreate = () => {
			$scope.isCreate = true;
			$rootScope.modalTitle = "Thêm mới";

			$scope.classSubject = {};
			$scope.classSubject.ClaSub_Semester = "";

			resetSubjects();
		};

		$scope.onclick_btnUpdate = (item) => {
			$scope.isCreate = false;
			$rootScope.modalTitle = "Chỉnh sửa";

			resetSubjects();

			$scope.classSubject = angular.copy(item);

			$scope.subjects.forEach(x => {
				if($scope.classSubject.ClaSub_SubjectIds.includes(x.Sub_Id.toString())) {
					x.IsChecked = true;
				}
			});
		};

		$scope.onclick_btnDelete = (item) => {
			$rootScope.modalTitle = "Xóa";
		};

		$scope.onsubmit_fForm = () => {
			func.closeSubmit();

			let data = $scope.classSubject;
			data.ClaSub_ClassId = Number($routeParams.Cla_Id);
			let choseSubjects = $scope.subjects.filter(x => x.IsChecked);

			// Một học kỳ phải có từ 4 -> 6 môn
			if(choseSubjects.length < 4 || choseSubjects.length > 6) {
				func.showToast("Một học kỳ phải từ 4 -> 6 môn học", "warning");
				func.openSubmit();
				return;
			}

			data.ClaSub_SubjectIds = choseSubjects.map(y => y.Sub_Id).join("_");

			if($scope.isCreate) {
				let requestApi = api.ClassesSubjects.Insert;
				client.Post(requestApi, data).then(response => {
					getClassesSubjectsByClassId($routeParams.Cla_Id);
					func.openSubmit();
					func.hideModal();
				}).catch(ex => {
					$log.info(ex);
					func.openSubmit();
				});
			}
			else {
				let requestApi = api.ClassesSubjects.Update;
				client.Put(requestApi, data).then(response => {
					getClassesSubjectsByClassId($routeParams.Cla_Id);
					func.openSubmit();
					func.hideModal();
				}).catch(ex => {
					$log.info(ex);
					func.openSubmit();
				});
			}
		};

		$scope.onsubmit_fDelete = () => {
			func.closeSubmit();
			let data = angular.copy($scope.classSubject);
			let requestApi = api.ClassesSubjects.Delete;
			client.Delete(requestApi, data).then(response => {
				getClassesSubjectsByClassId($routeParams.Cla_Id);
				func.openSubmit();
				func.hideModal();
			}).catch(ex => {
				$log.info(ex);
				func.openSubmit();
			});
		};
	}

})();

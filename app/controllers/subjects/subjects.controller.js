(function () {
	'use strict';

	angular
		.module('app')
		.controller('subjects', subjects);

		subjects.$inject = ['$scope', '$rootScope', '$log', '$http', 'api', 'func', 'client', 'seed'];

	function subjects($scope, $rootScope, $log, $http, api, func, client, seed) {
		activate();

		/* Lists */
		$scope.subjects = [];
		$scope.classesSubjects = [];

		/* Functions */
		function activate() {
			getSubjects();
			getClassesSubjects();
		}

		function getSubjects() {
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
						item.ClaSub_Id = Number(item.ClaSub_Id);
						item.ClaSub_ClassId = Number(item.ClaSub_ClassId);
						item.ClaSub_Semester = Number(item.ClaSub_Semester);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		/* Events */
		$scope.onclick_row = (item) => {
			$scope.isCreate = false;
			$scope.subject = angular.copy(item);
		};

		$scope.onclick_btnCreate = () => {
			$scope.isCreate = true;
			$rootScope.modalTitle = "Thêm mới";

			$scope.subject = {};
			$scope.subject.Sub_Name = "subject";
			$scope.subject.Sub_Lessons = 90;
			$scope.subject.Sub_CreditTheory = 15;
			$scope.subject.Sub_CreditPractice = 30;
			$scope.subject.Sub_CreditExercise = 45;
		};

		$scope.onclick_btnUpdate = () => {
			$scope.isCreate = false;
			$rootScope.modalTitle = "Chỉnh sửa";
		};

		$scope.onclick_btnDelete = () => {
			$rootScope.modalTitle = "Xóa";
		};

		$scope.onsubmit_fForm = () => {
			func.closeSubmit();
			let data = angular.copy($scope.subject);
			
			// Check
			let totalCredits = data.Sub_CreditTheory + data.Sub_CreditPractice + data.Sub_CreditExercise;
			if(totalCredits !== data.Sub_Lessons)
			{
				func.showToast("Tổng số tín chỉ phải bằng số tiết", "warning");
				func.openSubmit();
				return;
			}

			if ($scope.isCreate) {
				let requestApi = api.Subjects.Insert;
				client.Post(requestApi, data).then(response => {
					getSubjects();
					func.openSubmit();
					func.hideModal();
				}).catch(ex => {
					$log.info(ex);
					func.openSubmit();
				});
			}
			else {
				let requestApi = api.Subjects.Update;
				client.Put(requestApi, data).then(response => {
					getSubjects();
					func.openSubmit();
					func.hideModal();
				}).catch(ex => {
					$log.info(ex);
					func.openSubmit();
				});
			}
		};

		$scope.onsubmit_fDelete = () => {
			// Check
			if($scope.classesSubjects.some(x => x.ClaSub_SubjectIds.includes($scope.subject.Sub_Id.toString()))) {
				func.showToast("Môn học đã được xếp lớp, không thể xóa", "warning");
				func.hideModal();
				return;
			}

			func.closeSubmit();
			let data = angular.copy($scope.subject);
			let requestApi = api.Subjects.Delete;
			client.Delete(requestApi, data).then(response => {
				getSubjects();
				func.openSubmit();
				func.hideModal();
			}).catch(ex => {
				$log.info(ex);
				func.openSubmit();
			});
		};
	}

})();

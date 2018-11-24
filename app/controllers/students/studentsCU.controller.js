(function () {
	'use strict';

	angular
		.module('app')
		.controller('studentsCU', studentsCU);

	studentsCU.$inject = ['$scope', '$log', '$rootScope', '$location', '$routeParams', 'client', 'api', 'func', 'seed'];

	function studentsCU($scope, $log, $rootScope, $location, $routeParams, client, api, func, seed) {
		$scope.isCreate = $location.path().includes("create") ? true : false;

		activate();

		/* Lists */
		$scope.classes = [];
		$scope.students = [];
		$scope.subjects = [];
		$scope.classesSubjects = [];

		/* Functions */
		function activate() {
			getClasses();
			getStudents();

			$scope.student = {};

			if ($scope.isCreate) {
				$scope.student.Stu_Code = "Auto generate";
				$scope.student.Stu_Image = $rootScope.defaultImageUrl;
				$scope.student.Stu_Name = "student";
				$scope.student.Stu_DOB = new Date(func.getCurrentDateString());
				$scope.student.Stu_Email = "example@gmail.com";
				$scope.student.Stu_Phone = "0909090909";
				$scope.student.Stu_ClassId = "";
			}
			else {
				getStudent($routeParams.Stu_Id, (classId) => {
					getSubjects(() => {
						getClassesSubjectsByClassId(classId);
					});
				});
			}
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

		function getClasses() {
			let requestApi = api.Classes.GetAll;
			client.Get(requestApi).then(response => {
				if (!!response) {
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
				if (!!response) {
					$scope.students = response.records;
					$scope.students.forEach(item => {
						item.Stu_Id = Number(item.Cla_Id);
					});
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getStudent(id, callback) {
			let requestApi = api.Students.GetById.concat("?id=", id);
			client.Get(requestApi).then(response => {
				if (!!response) {
					response.Stu_Id = Number(response.Stu_Id);
					response.Stu_Image = !!response.Stu_Image ? "files/".concat(response.Stu_Image) : $rootScope.defaultImageUrl;
					response.Stu_ClassId = Number(response.Stu_ClassId);
					response.Stu_DOB = new Date(func.splitDateString(response.Stu_DOB));

					$scope.student = response;

					if (!!callback)
						callback($scope.student.Stu_ClassId);
				}
			}).catch(ex => {
				$log.info(ex);
			});
		}

		function getClassesSubjectsByClassId(classId) {
			let requestApi = api.ClassesSubjects.GetByClassId.concat("?classId=", classId);
			client.Get(requestApi).then(response => {
				if (!!response) {
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

		function uploadFile(file, callback) {
			// 1. New file
			if (!!file && !angular.isString(file)) {
				let requestApi = api.Files.Upload;
				client.PostFile(requestApi, file).then(response => {
					if (response.Success) {
						callback(response.FilePath);
					}
					else { // 1.1 Failed while uploading file
						func.showToast(response.Message, "warning");
						func.openSubmit();
						return;
					}
				}).catch(ex => {
					$log.info(ex);
				});
			}
			else if (angular.isString(file) && file.includes("files/")) {
				file = file.replace("files/", "");
				callback(file);
			}
			else { // 2. There is no file
				callback(null);
			}
		}

		/* Events */
		$scope.onsubmit_fStudent = () => {
			func.closeSubmit();

			let data = angular.copy($scope.student);

			uploadFile($scope.student.Stu_Image, (fileName) => {
				data.Stu_Image = fileName;
				data.Stu_DOB = func.getDateString(data.Stu_DOB);

				if ($scope.isCreate) {

					// Auto generate code
					data.Stu_Code = "SV" + ($scope.students.length + 1);

					if (data.Stu_Name === "student")
						data.Stu_Name = "student " + ($scope.students.length + 1);

					let requestApi = api.Students.Insert;
					client.Post(requestApi, data).then(response => {
						if (response.Success)
							func.goBack();
						else {
							func.showToast("Lỗi khi thêm mới", "warning");
							func.openSubmit();
						}
					}).catch(ex => {
						$log.info(ex);
						func.openSubmit();
					});
				}
				else {
					let requestApi = api.Students.Update;
					client.Put(requestApi, data).then(response => {
						if (response.Success)
							func.goBack();
						else {
							func.showToast("Lỗi khi sửa", "warning");
							func.openSubmit();
						}
					}).catch(ex => {
						$log.info(ex);
						func.openSubmit();
					});
				}
			});
		};

		$scope.onclick_btnSetDefaultImage = () => {
			$scope.student.Stu_Image = $rootScope.defaultImageUrl;
		};
	}

})();

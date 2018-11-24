(function () {
	'use strict';

	angular
		.module('app')
		.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
			// Root
			let root = "";

			$routeProvider.when("/login", {
				templateUrl: root + "app/controllers/login/login.html",
				controller: "login"
			});

			$routeProvider.when("/dashboard", {
				templateUrl: root + "app/controllers/dashboard.html",
				controller: ""
			});

			// Account
			$routeProvider.when("/account", {
				templateUrl: root + "app/controllers/account/account.html",
				controller: "account"
			});
			
			/* ========== */

			// Classes
			$routeProvider.when("/classes", {
				templateUrl: root + "app/controllers/classes/classes.html",
				controller: "classes"
			});

			$routeProvider.when("/classes/:Cla_Id/set-subjects", {
				templateUrl: root + "app/controllers/classes/classesSubjects.html",
				controller: "classesSubjects"
			});

			$routeProvider.when("/classes/:Cla_Id/students", {
				templateUrl: root + "app/controllers/students/students.html",
				controller: "students"
			});

			$routeProvider.when("/classes-schedules", {
				templateUrl: root + "app/controllers/classes/classesSchedules.html",
				controller: "classesSchedules"
			});

			// Subjects
			$routeProvider.when("/subjects", {
				templateUrl: root + "app/controllers/subjects/subjects.html",
				controller: "subjects"
			});

			// Students
			$routeProvider.when("/students", {
				templateUrl: root + "app/controllers/students/students.html",
				controller: "students"
			});

			$routeProvider.when("/students/create", {
				templateUrl: root + "app/controllers/students/studentsCU.html",
				controller: "studentsCU"
			});

			$routeProvider.when("/students/:Stu_Id/update", {
				templateUrl: root + "app/controllers/students/studentsCU.html",
				controller: "studentsCU"
			});

			$routeProvider.otherwise({ redirectTo: "/dashboard" });
		}]);

})();

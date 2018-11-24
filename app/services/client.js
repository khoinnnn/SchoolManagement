(function () {
	'use strict';

	angular
		.module('app')
		.service('client', client);

	client.$inject = ['$http', '$rootScope', '$log', '$cookies', '$location', '$q', 'func', 'seed'];

	function client($http, $rootScope, $log, $cookies, $location, $q, func, seed) {
		const statusCode = {
			// 1. Information responses
			// ...
			// 2. Successful responses
			OK: 200,
			CREATED: 201,
			NO_CONTENT: 204,
			// 3. Redirection messages
			// ...
			// 4. Client error responses
			BAD_REQUEST: 400,
			UNAUTHORIZED: 401,
			NOT_FOUND: 404,
			METHOD_NOT_ALLOWED: 405,
			// 5. Server error responses
			INTERNAL_SERVER_ERROR: 500
		}

		this.Get = function (requestApi) {
			let token = $cookies.get("token");
			$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			return $http({
				method: 'GET',
				url: requestApi
			}).then(function (response) {
				if (!!response.data)
					return response.data;
				return response;
			}, err => {
				$log.info(err);
				showError(err);
			});
		};

		this.Post = function (requestApi, data) {
			return $http({
				method: 'POST',
				url: requestApi,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: data
			}).then(function (response) {
				showMessage(response);
				if(!!response.data)
					return response.data;
				return response;
			}, err => {
				$log.info(err);
				showError(err);
				func.openSubmit();
			});
		};

		this.PostFile = function (requestApi, file) {
			let formData = new FormData();

			formData.append("file", file);

			return $http({
				method: 'POST',
				headers: { 'Content-Type': undefined },
				url: requestApi,
				data: formData
			}).then(function (response) {
				showMessage(response);
				if (!!response.data)
					return response.data;
				return response;
			}, err => {
				$log.info(err);
				showError(err);
				func.openSubmit();
			});
		};

		this.PostFiles = function (requestApi, files) {
			let formData = new FormData();

			for (var i = 0; i < files.length; i++) {
				formData.append("file" + i, files[i]);
			}

			return $http({
				method: 'POST',
				headers: { 'Content-Type': undefined },
				url: requestApi,
				data: formData
			}).then(function (response) {
				showMessage(response);
				if (!!response.data)
					return response.data;
				return response;
			}, err => {
				$log.info(err);
				showError(err);
				func.openSubmit();
			});
		};

		this.Put = function (requestApi, data) {
			return $http({
				method: 'PUT',
				url: requestApi,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: data
			}).then(function (response) {
				showMessage(response);
				if (!!response.data)
					return response.data;
				return response;
			}, err => {
				$log.info(err);
				showError(err);
				func.openSubmit();
			});
		};

		this.Delete = function (requestApi, data) {
			return $http({
				method: 'DELETE',
				url: requestApi,
				headers: {
					'Content-type': 'application/json; charset=utf-8'
				},
				data: data //params: params
			}).then(function (response) {
				showMessage(response);
				if (!!response.data)
					return response.data;
				return response;
			}, err => {
				$log.info(err);
				showError(err);
				func.openSubmit();
			});
		};

		this.GetAPIs = function (requestApis) {
			var promises = [];

			angular.forEach(requestApis, function (requestApi) {
				var promise = $http({
					url: requestApi,
					method: 'GET'
				});

				promises.push(promise);
			});

			return $q.all(promises);
		};

		function showMessage(response) {
			if (!!response && response.status === statusCode.OK)
				func.showToast("Thành công", "success");
		}

		function showError(err) {
			if (err.status === statusCode.INTERNAL_SERVER_ERROR) {
				func.showToast(err.data.ExceptionMessage, "danger");
				func.openSubmit();
			}
			else if (err.status === statusCode.UNAUTHORIZED) {
				//$rootScope.isAuthorized = false;
				//$location.path("/login");
			}
		}
	}
})();
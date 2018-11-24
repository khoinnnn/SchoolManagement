(function () {
	'use strict';

	angular
		.module('app')
		.factory('func', func);

	func.$inject = ['$http', '$timeout', '$rootScope', '$log', '$translate',
		// Custom
		'seed',
		// 3rd Party Modules
		'Flash'
	];

	function func($http, $timeout, $rootScope, $log, $translate,
		// Custom
		seed,
		// 3rd Party Modules
		Flash
	) {
		// Extensions
		Object.defineProperties(Array.prototype, {
			count: {
				value: function (query) {
					/* 
					   Counts number of occurrences of query in array, an integer >= 0 
					   Uses the javascript == notion of equality
					*/
					var count = 0;
					for (let i = 0; i < this.length; i++)
						if (this[i] == query)
							count++;
					return count;
				}
			}
		});

		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		}

		var service = {
			readFile: readFile,
			exportFile: exportFile,

			// Ramdom
			getRandomArbitrary: getRandomArbitrary,
			getRandomInt: getRandomInt,
			getUniqueString: getUniqueString,

			// Convert
			dec2Bin: dec2Bin,
			paddingString: paddingString,

			// Effect
			closeSubmit: closeSubmit,
			openSubmit: openSubmit,
			focusInput: focusInput,
			showModal: showModal,
			hideModal: hideModal,
			goBack: goBack,
			showToast: showToast,

			// Datetime
			getDateString: getDateString,
			getDateStringFormat: getDateStringFormat,
			getShortDateString: getShortDateString,
			getShortDateStringFormat: getShortDateStringFormat,
			splitDateString: splitDateString,

			getCurrentDateString: getCurrentDateString, // YYYY-MM-DD
			getCurrentShortDateString: getCurrentShortDateString, // YYYY-MM
			getCurrentTimeString: getCurrentTimeString, // HH:mm
			getCurrentDateTimeString: getCurrentDateTimeString, // YYYY-MM-DD HH:mm

			getCurrentDate: getCurrentDate,
			getCurrentYear: getCurrentYear,
			getCurrentMonth: getCurrentMonth,
			getCurrentDay: getCurrentDay,
			getDaysInMonth: getDaysInMonth,

			countSpecificWeekdaysInMonth: countSpecificWeekdaysInMonth,

			compareTwoDate: compareTwoDate,
			isMaxDateString: isMaxDateString,
			isMinDateString: isMinDateString
		};

		return service;

		/**
		 * Read excel file and return JSON
		 * @param {any} file excel file
		 */
		function readFile(file, sheetName, headers) {
			var result = [];
			if (file) {
				var reader = new FileReader();
				return new Promise((resolve, reject) => {
					reader.onload = function (e) {
						var data = e.target.result;
						var workbook = XLSX.read(data, { type: 'binary' });
						//var first_sheet_name = workbook.SheetNames[0];
						//var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name], { header: headers });
						var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
						if (dataObjects.length > 0)
							resolve(dataObjects);
						else resolve(result);
					}
					reader.onerror = function (ex) { func.showToast("Error while reading file", "warning"); }
					reader.readAsBinaryString(file);
				});
			}
			else return result;
		}

		function exportFile(fileName,
			sheetMainName, mainData, supportData, supportDataLocation) {
			if (!!fileName && !!sheetMainName && !!mainData) {
				/* Make the worksheet */
				var wsMain = XLSX.utils.json_to_sheet(mainData);

				/* Add support data */
				if (!!supportData && !!supportDataLocation) {
					var wsSupport = XLSX.utils.json_to_sheet([]);
					for (var i = 0; i < supportData.length; i++) {
						XLSX.utils.sheet_add_json(wsSupport, supportData[i], { origin: supportDataLocation[i] });
					}
				}

				/* Add to workbook */
				var wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, wsMain, sheetMainName);
				if (!!supportData && !!supportDataLocation)
					XLSX.utils.book_append_sheet(wb, wsSupport, "Support");

				/* Generate an XLSX file */
				XLSX.writeFile(wb, fileName.concat(".xlsx"));
			}
		}

		/**
		 * Returns a random number between min (inclusive) and max (exclusive)
		 */
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}

		/**
		 * Returns a random integer between min (inclusive) and max (inclusive)
		 * Using Math.round() will give you a non-uniform distribution!
		 */
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		/**
		 * Generate UNIQUE string
		 */
		function getUniqueString(limit) {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < limit; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length)).toUpperCase();

			return text;
		}

		function dec2Bin(dec) {
			return (dec >>> 0).toString(2);
		}

		function paddingString(number, str) {
			return str.padStart(number, str)
		}

		function closeSubmit() {
			$(':button[type="submit"]').prop('disabled', true);
		}

		function openSubmit() {
			$timeout(function () {
				$(':button[type="submit"]').prop('disabled', false);
			}, 1000);
		}

		/**
		 * Focus first input
		 */
		function focusInput() {
			$(":input:first").focus();
		}

		/**
		 * Show modal Bootstrap
		 */
		function showModal(target) {
			$(target).modal('show');
		}

		/**
		 * Hide modal Bootstrap
		 */
		function hideModal() {
			$('.modal').modal('hide');
		}

		/**
		 * Back history
		 */
		function goBack() {
			window.history.back();
		}

		function showToast(msg, classType) {
			var message = "<strong>Notice</strong><br/>" + msg;
			var id = Flash.create(classType, message, 5000, { class: "custom-flash", id: "custom-id" }, true);
		}

		function getDateString(dateStringFormat) {
			if (!!dateStringFormat)
				return moment(dateStringFormat, $rootScope.formatDateShow).format("YYYY-MM-DD");
			return moment().format("YYYY-MM-DD");
		}

		function getDateStringFormat(dateString) {
			if (!!dateString)
				return moment(dateString, "YYYY-MM-DD").format($rootScope.formatDateShow);
			return moment().format($rootScope.formatDateShow);
		}

		function getShortDateString(shortDateStringFormat) {
			if (!!shortDateStringFormat)
				return moment(shortDateStringFormat, $rootScope.formatShortDateShow).format("YYYY-MM");
			return moment().format("YYYY-MM");
		}

		function getShortDateStringFormat(shortDateString) {
			if (!!shortDateString)
				return moment(shortDateString, "YYYY-MM").format($rootScope.formatShortDateShow);
			return moment().format($rootScope.formatDateShow);
		}

		/**
		 * 2018-09-09T23:52:41.6 => 2018-09-09
		 */
		function splitDateString(dateString) {
			return dateString.split(' ')[0];
		}

		/**
		 * Get current date string with format YYYY-MM-DD
		 * */
		function getCurrentDateString() {
			let year = getCurrentYear();
			let month = getCurrentMonth();
			let day = getCurrentDay();
			let yearString = year + "";
			let monthString = month < 10 ? "0" + month : month;
			let dayString = day < 10 ? "0" + day : day;
			return yearString + "-" + monthString + "-" + dayString;
		}

		/**
		 * Get current date string with format YYYY-MM
		 * */
		function getCurrentShortDateString() {
			let year = getCurrentYear();
			let month = getCurrentMonth();
			let yearString = year + "";
			let monthString = month < 10 ? "0" + month : month;
			return yearString + "-" + monthString;
		}

		/**
		 * Get current time string with format HH:mm
		 * */
		function getCurrentTimeString() {
			let date = getCurrentDate();
			return date.getHours() + ":" + date.getMinutes();
		}

		/**
		 * Get current datetime string with format YYYY-MM-DD HH:mm
		 * */
		function getCurrentDateTimeString() {
			return getCurrentDateString() + " " + getCurrentTimeString();
		}

		function getCurrentDate() {
			return new Date();
		}

		/**
		 * Get curent year
		 */
		function getCurrentYear() {
			return getCurrentDate().getFullYear();
		}

		/**
		 * Get curent month
		 */
		function getCurrentMonth() {
			// We need to +1 because month starts from 0 -> 11
			return getCurrentDate().getMonth() + 1;
		}

		/**
		 * Get curent day
		 */
		function getCurrentDay() {
			return getCurrentDate().getDate();
		}

		function getDaysInMonth(year, month) {
			return new Date(year, month, 0).getDate();
		}

		/**
		 * Count weekdays such as Saturday, Sunday, ...
		 * @param {any} year
		 * @param {any} month
		 * @param {any} weekday
		 */
		function countSpecificWeekdaysInMonth(year, month, weekday) {
			var day, counter, date;

			day = 1;
			counter = 0;
			date = new Date(year + "-" + month + "-" + day);
			while (date.getMonth() === (month - 1)) { // We need to -1 because month starts from 0 -> 11
				if (date.getDay() === weekday) {
					counter += 1;
				}

				date = date.addDays(1);
			}

			return counter;
		}

		/**
		 * @param {any} date1 
		 * @param {any} date2
		 * @returns {-1} date1 < date2
		 * @returns {0} date1 = date2
		 * @returns {1} date1 > date2
		 */
		function compareTwoDate(date1, date2) {
			let time1 = date1.getTime();
			let time2 = date2.getTime();
			if (time1 < time2)
				return -1;
			else if (time1 === time2)
				return 0;
			else
				return 1;
		}

		/**
		 * 2100 is maximum date
		 * @param {any} date
		 */
		function isMaxDateString(dateString) {
			let date = new Date(dateString);
			return date.getFullYear() === 2100 || 9999 ? true : false;
		}

		/**
		 * 0001 is maximum date
		 * @param {any} date
		 */
		function isMinDateString(dateString) {
			let date = new Date(dateString);
			return date.getFullYear() === 1 ? true : false;
		}
	}

})();
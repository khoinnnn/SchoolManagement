(function () {
    'use strict';

    angular
        .module('app')
        .factory('api', api);

    api.$inject = ['$http'];

	function api($http) {
		var localhost = "";
		var service = {
			Account: {
				Users: localhost + "api/Account/Users",
				Register: localhost + "api/Account/Register",
				Login: localhost + "api/Account/Login",
				ValidateToKen: localhost + "api/Account/ValidateToken",
				UserInfo: localhost + "api/Account/UserInfo"
			},
			Dept: {
				Base: localhost + "api/Depts",
				CreateDepts: "api/Depts/CreateDepts"
			},
			Staff: {
				Base: localhost + "api/Staffs",
				Info: localhost + "api/Staffs/StaffInfo",
				CreateStaffs: localhost + "api/Staffs/CreateStaffs"
			},
			Contract: {
				Base: localhost + "api/Contracts",
				GetByStaff: localhost + "/api/Contracts/ByStaff"
			},
			Insurance: {
				Base: localhost + "api/Insurances"
			},
			Pit: {
				Base: localhost + "api/Taxes"
			},
			Wom: {
				Base: localhost + "api/WorkingDays",
				CreateWorkingDays: localhost + "api/WorkingDays/CreateWorkingDays"
			},
			Payroll: {
				Base: localhost + "api/Payslips",
				ByStaff: localhost + "api/Payslips/ByStaff",
				Salary: localhost + "api/Payslips/Salaries",
				RunByMonth: localhost + "api/Payslips/RunPayroll",
				ByMonth: localhost + "api/Payslips/ByMonth",
				DeleteByMonth: localhost + "api/Payslips/DeleteByMonth",
				InsuranceStaff: localhost + "api/Payslips/GetInsurancesByMonth"
			},
			Holiday: {
				Base: localhost + "api/Holidays"
			},
			Location: {
				City: localhost + "api/Locations/Cities",
				District: localhost + "api/Locations/Districts",
				Ward: localhost + "api/Locations/Wards"
			},
			Allowance: {
				Base: localhost + "api/Allowances",
				Details: localhost + "api/Allowances/AllowanceDetails",
				ForStaff: localhost + "api/Allowances/AllowanceForStaff",
				ByStaff: localhost + "api/Allowances/ByStaff",
				ByContract: localhost + "api/Allowances/ByContract",
				CreateAllowances: localhost + "api/Allowances/CreateAllowances"
			},
			Overtimes: {
				Base: localhost + "api/Overtimes",
				ByStaff: localhost + "api/Overtimes/ByStaff"
			},
			AdvancesPayments: {
				Base: localhost + "api/AdvancesPayments"
			},
			Leaves: {
				Base: localhost + "api/Leaves",
				ByStaff: localhost + "api/Leaves/ByStaff"
			},
			UserConfigs: {
				Base: localhost + "api/UserConfigs",
				ByUser: localhost + "api/UserConfigs/ByUser"
			},
			Validations: {
				DeptCode: localhost + "api/Validations/DeptCode",
				StaffCode: localhost + "api/Validations/StaffCode",
				YearOfWorkingDays: localhost + "/api/Validations/YearOfWorkingDays",
				Holiday: localhost + "api/Validations/Holiday"
			},
			Modules: {
				Base: localhost + "api/Modules"
			},
			Permissions: {
				Base: localhost + "api/Permissions"
			},
			GrantPermissions: {
				Base: localhost + "api/GrantPermissions",
				CreateGrantPermissions: localhost + "api/GrantPermissions/CreateGrantPermissions",
				GetByUserName: localhost + "api/GrantPermissions/GetByUserName",
				PutGrantPermissions: localhost + "api/GrantPermissions/PutGrantPermissions"
			},
			FileDescs: {
				Upload: localhost + "api/FileDescs/Upload",
				LoadImage: localhost + "api/FileDescs/LoadImage"
			},
			/* ========== */
			Classes: {
				GetAll: localhost + "api/Classes_GetAll.php",
				Insert: localhost + "api/Classes_Insert.php",
				Update: localhost + "api/Classes_Update.php",
				Delete: localhost + "api/Classes_Delete.php"
			},
			Subjects: {
				GetAll: localhost + "api/Subjects_GetAll.php",
				Insert: localhost + "api/Subjects_Insert.php",
				Update: localhost + "api/Subjects_Update.php",
				Delete: localhost + "api/Subjects_Delete.php"
			},
			Students: {
				GetAll: localhost + "api/Students_GetAll.php",
				GetById: localhost + "api/Students_GetById.php",
				Insert: localhost + "api/Students_Insert.php",
				Update: localhost + "api/Students_Update.php",
				Delete: localhost + "api/Students_Delete.php"
			},
			Files: {
				Upload: localhost + "api/Files_Upload.php"
			},
			ClassesSubjects: {
				GetAll: localhost + "api/ClassesSubjects_GetAll.php",
				GetByClassId: localhost + "api/ClassesSubjects_GetByClassId.php",
				Insert: localhost + "api/ClassesSubjects_Insert.php",
				Update: localhost + "api/ClassesSubjects_Update.php",
				Delete: localhost + "api/ClassesSubjects_Delete.php"
			}
        };

        return service;
    }
})();
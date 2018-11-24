(function () {
	'use strict';

	angular
		.module('app')
		.directive('checkPermission', ($filter, $rootScope, $cookies, func) => {
			let action = {
				"Read": 8,
				"Add": 4,
				"Edit": 2,
				"Delete": 1
			};

			return {
				restrict: 'A',
				scope: false,
				link: function (scope, elem, attrs, ctrl) {
					let grant = $cookies.get("grant");
					let splitGrant = !!grant ? grant.split("_") : [];
					let permissions = [];

					splitGrant.forEach(item => {
						let splitItem = item.split(".");
						permissions.push({ ModuleName: splitItem[0], PermissionKey: Number(splitItem[1]) });
					});
					
					let split = attrs.checkPermission.split("_");
					let moduleName = split[0];
					let specificAction = action[split[1]];

					let permission = permissions.find(x => x.ModuleName === moduleName);

					if (!!permission) {
						if ((permission.PermissionKey & specificAction) > 0)
							elem.show();
						else
							elem.hide();
					}
					else {
						elem.show();
					}
				}
			};
		});

})();
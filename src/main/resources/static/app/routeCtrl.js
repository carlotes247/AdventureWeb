angular.module("app").controller("RouteCtrl", RouteCtrl);

RouteCtrl.$inject = [ "$location"];

function RouteCtrl ($location) {

		var vm = this;

		vm.go = function(x) {
		$location.path(x);
	}
}

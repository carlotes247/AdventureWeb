angular.module("app").controller("RouteCtrl", RouteCtrl);

RouteCtrl.$inject = [ "$location" , "$timeout"];

function RouteCtrl ($location, $timeout) {

		var vm = this;

		vm.go = function(x) {
			$timeout(function() {$location.path(x);}, 500);
		}
}

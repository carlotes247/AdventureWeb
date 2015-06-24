angular.module("app").controller("RouteCtrl", RouteCtrl);

RouteCtrl.$inject = [ "$location" , "$timeout" , "$scope"];

function RouteCtrl ($location, $timeout, $scope) {

		var vm = this;

		vm.go = function(x) {
			timeout1 = $timeout(function() {$location.path(x);}, 500);
		}

		vm.stopGo = function(){
			if (angular.isDefined(timeout1)) {
            $timeout.cancel(timeout1);
            timeout1 = undefined;
          }
		}

		$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          vm.stopGo();
     });
}

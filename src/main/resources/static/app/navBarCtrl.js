angular.module("app").controller("navBarCtrl", navBarCtrl);

navBarCtrl.$inject = ["usersSharedDataService", "$location", "$scope", "$timeout", "$interval"];

function navBarCtrl (usersSharedDataService, $location, $scope, $timeout, $interval) {

	var vm = this;

	vm.loggedIn = usersSharedDataService.getLoggedIn();

	vm.updateLoggedIn = function() {
		vm.loggedIn = usersSharedDataService.getLoggedIn();

		console.log("NavBar updated to "+ vm.loggedIn);
	}

	vm.updateLoggedInWithTimeout = function() {
		timeout1 = $timeout(function() {vm.updateLoggedIn();}, 300);
	}

	vm.updateLoggedInWithInterval = function() {
		interval1 = $interval(function() {
			if (vm.loggedIn === false) {
				vm.updateLoggedIn();
			}
		}, 50);
	}

	vm.stopTimeouts = function() {
		if (angular.isDefined(timeout1)) {
       		$timeout.cancel(timeout1);
       		timeout1 = undefined;
       	}
       	if (angular.isDefined(interval1)) {
       		$timeout.cancel(interval1);
       		interval1 = undefined;
       	}
	}

	$scope.$on('$locationChangeSuccess', function() {
		console.log("ROUTE CHANGED HEEEELL YEAHHH! -> " + $location.path());
		vm.updateLoggedInWithTimeout();
	});

	$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          vm.stopTimeouts();

     });

	console.log("THE NAVBAR SAYS:");
	console.log(vm.loggedIn);

	vm.updateLoggedInWithInterval();

}
angular.module("app").controller("navBarCtrl", navBarCtrl);

navBarCtrl.$inject = ["usersSharedDataService", "$location", "$scope", "$timeout"];

function navBarCtrl (usersSharedDataService, $location, $scope, $timeout) {

	var vm = this;

	vm.loggedIn = usersSharedDataService.getLoggedIn();

	vm.updateLoggedIn = function() {
		vm.loggedIn = usersSharedDataService.getLoggedIn();

		console.log("NavBar updated to "+ vm.loggedIn);
	}

	$scope.$on('$locationChangeSuccess', function() {
		console.log("ROUTE CHANGED HEEEELL YEAHHH! -> " + $location.path());
		$timeout(function() {vm.updateLoggedIn();}, 300);
	});

	console.log("THE NAVBAR SAYS:");
	console.log(vm.loggedIn);

}
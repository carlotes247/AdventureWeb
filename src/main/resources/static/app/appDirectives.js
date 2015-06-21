(function () {
	var app = angular.module("app");

	app.directive("navBar", function () {
		return {
			restrict: 'E',
			templateUrl: "templates/navBar.html"
		}
	});

	

	app.directive("footerDirective", function () {
		return {
			restrict: 'E',
			templateUrl: "templates/footer.html"
		}
	});

	

}) ();






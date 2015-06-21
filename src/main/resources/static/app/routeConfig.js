angular.module("app").config(RouteConfig);

RouteConfig.$inject = [ '$routeProvider' ];

function RouteConfig($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: "templates/home.html"});
	$routeProvider.when('/about', {
		templateUrl: "templates/about.html"});
	$routeProvider.when('/signUp', {
		templateUrl: "templates/userSingUp.html",
		controller: 'testCtrl as vm'});
	$routeProvider.when('/login', {
		templateUrl: "templates/userLogin.html"});
	$routeProvider.when('/userCreated', {
		templateUrl: "templates/userCreated.html"});

}
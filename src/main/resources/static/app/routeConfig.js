angular.module("app").config(RouteConfig);

RouteConfig.$inject = [ '$routeProvider' ];

function RouteConfig($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: "templates/home.html"});
	$routeProvider.when('/about', {
		templateUrl: "templates/about.html"});
	$routeProvider.when('/howToPlay', {
		templateUrl: "templates/howToPlay.html"});
	$routeProvider.when('/ranking', {
		templateUrl: "templates/ranking.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, imagesService) {
				var users = usersService.getUsers();
				
				//var images = imagesService.getImages();
				//console.log(images);
				return this;
			}
		}
	});
	$routeProvider.when('/signUp', {
		templateUrl: "templates/userSingUp.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, imagesService) {
				var users = usersService.getUsers();
				
				var images = imagesService.getImages();
				console.log(images);
				return this;
			}
		}
	});
	$routeProvider.when('/login', {
		templateUrl: "templates/userLogin.html", 
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, $route, usersSharedDataService) {
				var users = usersService.getUsers();
				console.log(usersService.getUsers());
				var userShared = usersSharedDataService.getUserShared();

				return this;
			}
		}
	});
	$routeProvider.when('/userCreated', {
		templateUrl: "templates/userCreated.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService) {
				var users = usersService.getUsers();
				console.log(usersService.getUsers());
				return this;
			}
		}
	});
	$routeProvider.when('/afterLogin/:id', {
		templateUrl: "templates/afterLogin.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, $route, usersSharedDataService) {
				var users = usersService.getUsers();
				var user = usersService.getUser($route.current.params.id);
				//var userShared = usersSharedDataService.getUserShared();


				console.log($route.current.params.id);
				return this;
			}
		}
	});
	$routeProvider.when('/afterSignUp/:id', {
		templateUrl: "templates/afterSignUp.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, $route) {
				var users = usersService.getUsers();
				var user = usersService.getUser($route.current.params.id);

				console.log($route.current.params.id);
				return this;
			}
		}
	});
	$routeProvider.when('/signUp/Error', {
		templateUrl: "templates/signUpError.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService) {
				var users = usersService.getUsers();
				//var user = usersService.getUser("");

				return this;
			}
		}
	});
	$routeProvider.when('/loginError', {
		templateUrl: "templates/loginError.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, $route, usersSharedDataService) {
				var users = usersService.getUsers();
				var user = usersService.getUser();

				return this;
			}
		}
	});
	$routeProvider.when('/userMain', {
		templateUrl: "templates/userMain.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, $route) {
				var users = usersService.getUsers();
				var user = {};

				console.log();
				return this;
			}
		}
	});
	$routeProvider.when('/exploration', {
		templateUrl: "templates/exploration.html",
		controller: 'testCtrl',
		controllerAs: 'vm', 
		resolve: {
			testResolve: function(usersService, $route) {
				var users = usersService.getUsers();
				var user = {};

				console.log();
				return this;
			}
		}
	});
	$routeProvider.otherwise({ redirectTo: '/'});

}
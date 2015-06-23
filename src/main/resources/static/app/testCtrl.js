angular.module('app').controller('testCtrl', testCtrl);

testCtrl.$inject = [ "usersService" , "testResolve" , "usersSharedDataService", "$interval", "$location", "$scope"];

function testCtrl(usersService, testResolve, usersSharedDataService, $interval, $location, $scope) {
    var vm = this;
    vm.test = [];
    //vm.test = usersService.getUsers();

    //Attributes
    vm.userName = "";
	vm.password = "";
	vm.users = testResolve.users;
	vm.user = testResolve.user;
	vm.check;
	vm.userShared = usersSharedDataService.getUserShared();
	//vm.userShared = testResolve.userShared;
	vm.setUserOnceCalled = false;
	vm.gold = usersSharedDataService.getGold();
	vm.loggedIn = usersSharedDataService.getLoggedIn();
	vm.currentPath = $location.path();

	//This var is for having a reference to the interval and stopping it correctly
	var addingGoldInterval;

	console.log(vm.currentPath);
	//console.log(testResolve);
	console.log(vm.userShared);

	// Functions
	vm.setName = function(name) {
		vm.name = name;
	}
	
	vm.getUsers = function() {
		vm.users = usersService.getUsers();
	}
	
	vm.getUser = function(userName) {
		return usersService.getUser(userName);
	}

	vm.getUserName = function(user) {
		return user.userName;
	}

	vm.getUserInUsers = function() {
		console.log("getUserInUsers called!" + vm.users.length)
		for (var i = 0; i < vm.users.length; i++) {
			console.log(vm.users[i]);
		};
	}
	
	vm.logIn = function(userName, password) {
		var auxUser = vm.getUser(userName);
		var inputUser = auxUser;
		//vm.password = auxUser;
		if (inputUser === password) {
			return true;
		} else {
			return auxUser;
		}
	}
	
	vm.setUser = function(userName, password) {
		console.log("setUser called!");
		var newUser = {"userName": userName, "password": password}
		usersService.newUser(newUser);
		
	}

	vm.setUserOnce = function(userName, password) {
		if (vm.setUserOnceCalled) {
			console.log("ALREADY called setUser!");
		} else {
			console.log("setUser called!");
			var newUser = {"userName": userName, "password": password}
			usersService.newUser(newUser);
			vm.setUserOnceCalled = true;
		}		
	}

	vm.setUserSharedData = function(data) {
		usersSharedDataService.setUserData(data);
	}

	vm.setUserShared = function(userName, password) {
		usersSharedDataService.setUserShared(userName, password);
		vm.getUserShared();
	}

	vm.getUserShared = function() {
		usersSharedDataService.getUserShared();
	}

	vm.equals = function(x, y) {
		if (x === y) {
			return true;
		} else {
			return false;
		};
	}

	vm.addGold = function(gold) {
		if (vm.getLoggedIn()) {
			console.log("Adding gold...");
			//auxGold = vm.gold;
			vm.gold += gold;
			usersSharedDataService.setGold(vm.gold);
		} else {
			console.log("Can't add gold! LogStatus: " + vm.getLoggedIn());
		};
		
	}

	vm.getGold = function() {
		vm.gold = usersSharedDataService.getGold();
		return vm.gold;
	}

	vm.clearUserSharedInService = function() {
		usersSharedDataService.clearUserShared();
	}

	vm.addGoldEverySec = function(gold) {
		addingGoldInterval = $interval(function() {vm.addGold(gold)}, 1000);

	}

	vm.stopAddGoldEverySec = function() {
		if (angular.isDefined(addingGoldInterval)) {
            $interval.cancel(addingGoldInterval);
            addingGoldInterval = undefined;
          }
	}

	vm.setLoggedIn = function(x) {
		usersSharedDataService.setLoggedIn(x);
	}

	vm.getLoggedIn = function() {
		return usersSharedDataService.getLoggedIn();
	}

	vm.updateLoggedIn = function() {
		if (vm.currentPath === '/userMain') {
			vm.setLoggedIn(true);
			vm.updateSharedGold();
			console.log("THE ROUTE IS THE SAME");
		} else {
			vm.setLoggedIn(false);
		}
		console.log(vm.loggedIn);
	}	

	vm.updateSharedGold = function() {
		usersSharedDataService.getGoldFromServer();
	}


	// Logic
	vm.addGoldEverySec(1);

	vm.updateLoggedIn();

	$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          vm.stopAddGoldEverySec();
     });
	//vm.getUsers();
	//vm.check = vm.getUser("Carlos");
	//vm.check = vm.logIn("Carlos", "1234");
	//vm.check = usersService.getPassword("Carlos");
	//vm.check = vm.getUserInUsers("Carlos");
	//vm.check = filterFilter(vm.users, '');
	//console.log(vm.check);
	//vm.getUserInUsers();

  }

  
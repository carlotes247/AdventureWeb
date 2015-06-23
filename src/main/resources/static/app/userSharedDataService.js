angular.module("app").service("usersSharedDataService", UsersSharedDataService);

UsersSharedDataService.$inject = ["usersService" ];

function UsersSharedDataService (usersService) {
	var vm = this;

	vm.userData = {};
	vm.userShared = {};
	vm.loggedIn = false;
	vm.gold = 0;

	vm.setUserShared = function(x, y) {
		var auxUser = {"userName": x, "password": y};
		this.userShared = auxUser;
		console.log("Shared user set!");

	}

	vm.getUserShared = function() {
		return this.userShared;
		console.log("Shared user get!");
	}

	vm.clearUserShared = function() {
		vm.userShared = {};
	}

	vm.setUserData = function(x) {
		console.log("Data shared!");
		this.userData = x;
	}

	vm.getUserData = function() {
		return this.userData;
	}

	vm.setLoggedIn = function(x) {
		vm.loggedIn = x;
	}

	vm.getLoggedIn = function() {
		return vm.loggedIn;
	}

	vm.setGold = function(x) {
		console.log("SETTING SHARED GOLD -> " + x);
		vm.gold = x;
		console.log("AND THE SHARED GOLD IS -> " + vm.gold);
		aux = x % 10;
		console.log("The MOD value is: " + aux);
		if (aux === 0) {
			vm.updateUserInServer();
			console.log("AND NOW ON THE SERVER!!! :D ");

		};
		
	}

	vm.getGold = function() {
		console.log("GETTING SHARED GOLD -> " + vm.gold);
		return vm.gold;
	}

	vm.addGold = function(x) {
		vm.gold += x;
	}

	vm.updateUserInServer = function() {
		usersService.updateUser(vm.userShared.userName, vm.userShared.password, vm.gold);
	}

	vm.getGoldFromServer = function() {
		var aux = usersService.getUser(vm.userShared.userName);
		vm.gold = aux.gold;
	}


}


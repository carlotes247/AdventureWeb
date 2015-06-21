angular.module('app').controller('testCtrl', testCtrl);

testCtrl.$inject = [ "usersService", "filterFilter"];

function testCtrl(usersService, filterFilter) {
    var vm = this;
    vm.test = [];
    vm.test = usersService.getUsers();

    //Attributes
    vm.userName = "";
	vm.password = "";
	vm.users = [];
	vm.user = {};
	vm.check;

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
		var newUser = {"userName": userName, "password": password}
		usersService.newUser(newUser);
		
	}

	vm.getUsers();
	vm.check = vm.getUser("Carlos");
	//vm.check = vm.logIn("Carlos", "1234");
	//vm.check = usersService.getPassword("Carlos");
	//vm.check = vm.getUserInUsers("Carlos");
	//vm.check = filterFilter(vm.users, '');
	console.log(vm.check);
	//vm.getUserInUsers();

  }

  
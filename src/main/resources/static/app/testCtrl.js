angular.module('app').controller('testCtrl', testCtrl);

testCtrl.$inject = [ "usersService"];

function testCtrl(usersService) {
    var vm = this;
    vm.test = [];
    vm.test = usersService.getUsers();

    //Attributes
    vm.userName = "";
	vm.password = "";
	vm.users = [];
	vm.user = {};
	vm.check = false;

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
	
	vm.logIn = function(userName, password) {
		var auxUser = vm.getUser(userName);
		var inputUser = {"userName": userName, "password": password, "info": null};
		vm.password = auxUser;
		if (auxUser === inputUser) {
			return true;
		} else {
			return false;
		}
	}
	
	vm.setUser = function(userName, password) {
		var newUser = {"userName": userName, "password": password}
		usersService.newUser(newUser);
		
	}

	vm.getUsers();

  }
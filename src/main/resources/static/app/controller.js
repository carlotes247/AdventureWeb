angular.module("app").controller('Controller', Controller);

Controller.$inject = [ "testService" ];

function Controller (testService) {
	
	var vm = this;
	
	vm.test = "";
	vm.userName = "";
	vm.password = "";
	vm.users = [];
	vm.user = {};
	vm.check = false;
	
	vm.test = testService.getNumber();


	//vm.users = usersService.getUsers();
	
	/*vm.setName = function(name) {
		vm.name = name;
	}*/
	
	/*vm.getUsers = function() {
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
		
	}*/

	
	//vm.getUsers();
	//vm.users = usersService.getUsers();
	//vm.getUser("Carlos");
	//vm.setUser("Loli", "1234");
	//vm.getUsers();
	//vm.user = vm.getUser("Loli");
	//vm.logIn("PEPO", "123456")
	//vm.check = vm.logIn("Loli", "1234");
	
}


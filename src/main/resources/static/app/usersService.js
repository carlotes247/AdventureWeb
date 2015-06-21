angular.module("app").service("usersService", UsersService);

UsersService.$inject = ["$resource"];

 function UsersService ($resource) {
	var vm = this;
	
	vm.test = "this is a TEEEEEEEEST";
	this.users = [];

	this.getNumber = function () {
		return "2";
	}
	
	var UserResource = $resource('users/:id',
			{id : '@id'},
			{update : {method : "PUT"}}
	);
	
	this.getUsers = function () {
		users = UserResource.query();
		return users;
	}
	
	this.getUser = function (userName) {
		user = UserResource.get({id:userName});
		return user;
	}
	
	this.newUser = function(newUser) {
		new UserResource(newUser).$save(function(user) {
			vm.users.push(user);
		});
	}
	
	this.updateUser = function(updatedUser) {
		updatedUser.$update();
	}
	
	this.deleteUser = function(user) {
		user.$remove(function() {
			vm.users.splice(vm.users.indexOf(user), 1);
		});
	}

	//vm.newUser({"userName":"Pepe", "password":"2"});
	//vm.users = vm.getUsers();
};





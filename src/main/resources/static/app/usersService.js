angular.module("app").service("usersService", UsersService);

UsersService.$inject = ["$resource"];

 function UsersService ($resource) {
	var vm = this;
	
	vm.test = "this is a TEEEEEEEEST";
	this.users = [];
	vm.passwordToUse;

	this.getNumber = function () {
		return "2";
	}
	
	var UserResource = $resource('users/:id',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	var UserResource02 = $resource('users/:id/1',
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

	this.getUserName = function(userName) {
		userName = UserResource.get({id:userName}, function(value) {
			return value.userName;
		});
		return userName;
	}

	this.getPassword = function(userName) {
		/*var userPass = UserResource02.get({id:userName});*/
		var userPass;
		/*$http.get('users/' + userName).success(function(response) {
			console.log(response.password);
			vm.passwordToUse = response.password;
		})*/
		userPass = UserResource.get({id:userName});
		console.log(userPass);
		return userPass;
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





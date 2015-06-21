angular.module('app').service('testService', testService);



function testService () {

	var vm = this;

	this.getNumber = function () {
		return "2";
	}

}
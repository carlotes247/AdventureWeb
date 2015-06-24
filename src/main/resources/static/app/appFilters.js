(function () {
	var app = angular.module("app");

	app.filter("randomize", function () {
		return function (input){
			
			var out = [];

			if (input!=null && input!=undefined) {
		      var randomValue = Math.floor((Math.random()*input.length));
		      out = input;
		      return out[randomValue];
		    }  


		}
	});	

}) ();
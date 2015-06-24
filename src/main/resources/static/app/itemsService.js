angular.module("app").service("itemsService", ItemsService);

ItemsService.$inject = ["$resource" , "$timeout"];

 function ItemsService ($resource, $timeout) {
	var vm = this;
	
	vm.test = "this is a TEEEEEEEEST";
	this.items = [];

	this.getNumber = function () {
		return "2";
	}
	
	var ItemResource = $resource('items/:id',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	var ItemResource02 = $resource('items/:id/1',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	this.prepareInputAsItem = function (x, y, z) {
		itemToReturn = {
			"itemName" : x,
			"item" : y,
			"itemDescription" : z
		}

		return itemToReturn;
	}
	
	this.getItems = function () {
		items = ItemResource.query();
		return items;
	}
	
	this.getItem = function (itemName) {
		item = ItemResource.get({id:itemName});
		return item;
	}

	this.getItemName = function(itemName) {
		itemName = ItemResource.get({id:itemName}, function(value) {
			return value.itemName;
		});
		return itemName;
	}
	
	this.newItem = function(newItem) {
		console.log("newItem called");
		new ItemResource(newItem).$save(function(item) {
			vm.items.push(item);
			console.log("newItem created!");
		});
	}
	
	this.updateItem = function(x, y, z) {
		console.log("UPDATING IMAGE IN SERVER...");
		itemToUpdate = vm.prepareInputAsItem(x, y, z);
		console.log("The item update info is ==> ");
		console.log(itemToUpdate);
		new ItemResource(itemToUpdate).$update(function(item) {
			vm.items.push(item);
			console.log(x + " updated!");
		});
	}
	
	this.deleteItem = function(item) {
		item.$remove(function() {
			vm.items.splice(vm.items.indexOf(item), 1);
		});
	}

	vm.getItemsWithTimeout = function() {
		timeoutGetItems = $timeout(function() {
	      vm.items = vm.getItems();
	      console.log("getItemsFromService called! The items are: ");
	      console.log(vm.getItems());

	    }, 100);
	}

	vm.bla = function() {
		$timeout(function() {
	      console.log(vm.items[0]);

	    }, 500);
	}

	vm.stopGetItemTimeout = function() {
		if (angular.isDefined(timeoutGetItems)) {
            $interval.cancel(timeoutGetItems);
            timeoutGetItems = undefined;
          }
	}


	vm.newItem({
	    "itemName" : "firstItem",
	    "itemDescription" : "This is the first item ever to be created on earth",
	    "itemPrice" : "100",
	    "itemImage": {
	        "imageName" : "SegundaImagen",
	        "image" : "http://1.bp.blogspot.com/-SqtPrl0Evvc/UgEehpYWbBI/AAAAAAAAAK0/I56WPXpLKwo/s1600/Little_Snitch_256.png",
	        "imageDescription": "This is a basic description!"
	    }
	});
	vm.newItem({
	    "itemName" : "secondItem",
	    "itemDescription" : "This is the second item ever to be created on earth",
	   	"itemPrice" : "200",
	    "itemImage": {
	        "imageName" : "SegundaImagen",
	        "image" : "http://1.bp.blogspot.com/-SqtPrl0Evvc/UgEehpYWbBI/AAAAAAAAAK0/I56WPXpLKwo/s1600/Little_Snitch_256.png",
	        "imageDescription": "This is a basic description!"
	    }
	});
	vm.newItem({
	    "itemName" : "firstItem",
	    "itemDescription" : "This is the third item ever to be created on earth",
	    "itemPrice" : "300",
	    "itemImage": {
	        "imageName" : "SegundaImagen",
	        "image" : "http://1.bp.blogspot.com/-SqtPrl0Evvc/UgEehpYWbBI/AAAAAAAAAK0/I56WPXpLKwo/s1600/Little_Snitch_256.png",
	        "imageDescription": "This is a basic description!"
	    }
	});

	vm.getItemsWithTimeout();

	//vm.bla();
	//vm.newItem({"itemName":"Pepe", "password":"2"});
	//vm.items = vm.getItems();



};





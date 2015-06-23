angular.module("app").service("imagesService", ImagesService);

ImagesService.$inject = ["$resource" , "$timeout"];

 function ImagesService ($resource, $timeout) {
	var vm = this;
	
	vm.test = "this is a TEEEEEEEEST";
	this.images = [];

	this.getNumber = function () {
		return "2";
	}
	
	var ImageResource = $resource('images/:id',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	var ImageResource02 = $resource('images/:id/1',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	this.prepareInputAsImage = function (x, y, z) {
		imageToReturn = {
			"imageName" : x,
			"image" : y,
			"imageDescription" : z
		}

		return imageToReturn;
	}
	
	this.getImages = function () {
		images = ImageResource.query();
		return images;
	}
	
	this.getImage = function (imageName) {
		image = ImageResource.get({id:imageName});
		return image;
	}

	this.getImageName = function(imageName) {
		imageName = ImageResource.get({id:imageName}, function(value) {
			return value.imageName;
		});
		return imageName;
	}
	
	this.newImage = function(newImage) {
		console.log("newImage called");
		new ImageResource(newImage).$save(function(image) {
			vm.images.push(image);
			console.log("newImage created!");
		});
	}
	
	this.updateImage = function(x, y, z) {
		console.log("UPDATING IMAGE IN SERVER...");
		imageToUpdate = vm.prepareInputAsImage(x, y, z);
		console.log("The image update info is ==> ");
		console.log(imageToUpdate);
		new ImageResource(imageToUpdate).$update(function(image) {
			vm.images.push(image);
			console.log(x + " updated!");
		});
	}
	
	this.deleteImage = function(image) {
		image.$remove(function() {
			vm.images.splice(vm.images.indexOf(image), 1);
		});
	}

	vm.getImagesWithTimeout = function() {
		$timeout(function() {
	      vm.images = vm.getImages();
	      console.log("getImagesFromService called! The images are: ");
	      console.log(vm.getImages());

	    }, 100);
	}

	vm.bla = function() {
		$timeout(function() {
	      console.log(vm.images[0]);

	    }, 500);
	}


	vm.newImage({
		"imageName" : "firstSlide",
		"image" : "http://digital-art-gallery.com/oid/38/1200x600_8004_Medieval_interlude_4_2d_fantasy_landscape_adventure_picture_image_digital_art.jpg",
		"imageDescription" : "Have amazing adventures!"
	});
	vm.newImage({
		"imageName" : "secondSlide",
		"image" : "https://ajcarlisle.files.wordpress.com/2014/03/stevenss-epic-fantasy-criteria-transformative-tales-whendell-deviant-art1.jpg",
		"imageDescription" : "Explore misterious lands!"
	});
	vm.newImage({
		"imageName" : "thirdSlide",
		"image" : "https://allthingsmundane.files.wordpress.com/2010/04/treasure.jpg",
		"imageDescription" : "Find incredible treasures!"
	});

	vm.getImagesWithTimeout();
	//vm.bla();
	//vm.newImage({"imageName":"Pepe", "password":"2"});
	//vm.images = vm.getImages();



};





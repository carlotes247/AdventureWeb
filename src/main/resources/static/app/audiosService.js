angular.module("app").service("audiosService", AudiosService);

AudiosService.$inject = ["$resource" , "$timeout"];

 function AudiosService ($resource, $timeout) {
	var vm = this;
	
	vm.test = "this is a TEEEEEEEEST";
	this.audios = [];

	this.getNumber = function () {
		return "2";
	}
	
	var AudioResource = $resource('audios/:id',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	var AudioResource02 = $resource('audios/:id/1',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	this.prepareInputAsAudio = function (x, y, z) {
		audioToReturn = {
			"audioName" : x,
			"audio" : y,
			"audioDescription" : z
		}

		return audioToReturn;
	}
	
	this.getAudios = function () {
		audios = AudioResource.query();
		return audios;
	}
	
	this.getAudio = function (audioName) {
		audio = AudioResource.get({id:audioName});
		return audio;
	}

	this.getAudioName = function(audioName) {
		audioName = AudioResource.get({id:audioName}, function(value) {
			return value.audioName;
		});
		return audioName;
	}
	
	this.newAudio = function(newAudio) {
		console.log("newAudio called");
		new AudioResource(newAudio).$save(function(audio) {
			vm.audios.push(audio);
			console.log("newAudio created!");
		});
	}
	
	this.updateAudio = function(x, y, z) {
		console.log("UPDATING IMAGE IN SERVER...");
		audioToUpdate = vm.prepareInputAsAudio(x, y, z);
		console.log("The audio update info is ==> ");
		console.log(audioToUpdate);
		new AudioResource(audioToUpdate).$update(function(audio) {
			vm.audios.push(audio);
			console.log(x + " updated!");
		});
	}
	
	this.deleteAudio = function(audio) {
		audio.$remove(function() {
			vm.audios.splice(vm.audios.indexOf(audio), 1);
		});
	}

	vm.getAudiosWithTimeout = function() {
		$timeout(function() {
	      vm.audios = vm.getAudios();
	      console.log("getAudiosFromService called! The audios are: ");
	      console.log(vm.getAudios());

	    }, 100);
	}

	vm.bla = function() {
		$timeout(function() {
	      console.log(vm.audios[0]);

	    }, 500);
	}


	vm.newAudio({
		"audioName" : "song2_long.mp3",
		"audio" : "audio/song2_long.mp3",
	});
	vm.newAudio({
		"audioName" : "song2.mp3",
		"audio" : "audio/song2.mp3",
	});
	vm.newAudio({
		"audioName" : "song3.mp3",
		"audio" : "audio/song3.mp3",
	});

	vm.getAudiosWithTimeout();
	//vm.bla();
	//vm.newAudio({"audioName":"Pepe", "password":"2"});
	//vm.audios = vm.getAudios();



};





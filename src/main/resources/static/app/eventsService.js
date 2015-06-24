angular.module("app").service("eventsService", EventsService);

EventsService.$inject = ["$resource" , "$timeout"];

 function EventsService ($resource, $timeout) {
	var vm = this;
	
	vm.test = "this is a TEEEEEEEEST";
	this.events = [];

	this.getNumber = function () {
		return "2";
	}
	
	var EventResource = $resource('events/:id',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	var EventResource02 = $resource('events/:id/1',
			{id : '@id'},
			{update : {method : "PUT"}}
	);

	this.prepareInputAsEvent = function (x, y, z) {
		eventToReturn = {
			"eventName" : x,
			"event" : y,
			"eventDescription" : z
		}

		return eventToReturn;
	}
	
	this.getEvents = function () {
		events = EventResource.query();
		return events;
	}
	
	this.getEvent = function (eventName) {
		event = EventResource.get({id:eventName});
		return event;
	}

	this.getEventName = function(eventName) {
		eventName = EventResource.get({id:eventName}, function(value) {
			return value.eventName;
		});
		return eventName;
	}
	
	this.newEvent = function(newEvent) {
		console.log("newEvent called");
		new EventResource(newEvent).$save(function(event) {
			vm.events.push(event);
			console.log("newEvent created!");
		});
	}
	
	this.updateEvent = function(x, y, z) {
		console.log("UPDATING IMAGE IN SERVER...");
		eventToUpdate = vm.prepareInputAsEvent(x, y, z);
		console.log("The event update info is ==> ");
		console.log(eventToUpdate);
		new EventResource(eventToUpdate).$update(function(event) {
			vm.events.push(event);
			console.log(x + " updated!");
		});
	}
	
	this.deleteEvent = function(event) {
		event.$remove(function() {
			vm.events.splice(vm.events.indexOf(event), 1);
		});
	}

	vm.getEventsWithTimeout = function() {
		timeoutGetEvents = $timeout(function() {
	      vm.events = vm.getEvents();
	      console.log("getEventsFromService called! The events are: ");
	      console.log(vm.getEvents());

	    }, 100);
	}

	vm.bla = function() {
		$timeout(function() {
	      console.log(vm.events[0]);

	    }, 500);
	}

	vm.stopGetEventTimeout = function() {
		if (angular.isDefined(timeoutGetEvents)) {
            $interval.cancel(timeoutGetEvents);
            timeoutGetEvents = undefined;
          }
	}


	vm.newEvent({
		"eventName" : "firstSlide",
		"event" : "http://digital-art-gallery.com/oid/38/1200x600_8004_Medieval_interlude_4_2d_fantasy_landscape_adventure_picture_event_digital_art.jpg",
		"eventDescription" : "Have amazing adventures!"
	});
	vm.newEvent({
		"eventName" : "secondSlide",
		"event" : "https://ajcarlisle.files.wordpress.com/2014/03/stevenss-epic-fantasy-criteria-transformative-tales-whendell-deviant-art1.jpg",
		"eventDescription" : "Explore misterious lands!"
	});
	vm.newEvent({
		"eventName" : "thirdSlide",
		"event" : "https://allthingsmundane.files.wordpress.com/2010/04/treasure.jpg",
		"eventDescription" : "Find incredible treasures!"
	});

	vm.getEventsWithTimeout();

	//vm.bla();
	//vm.newEvent({"eventName":"Pepe", "password":"2"});
	//vm.events = vm.getEvents();



};

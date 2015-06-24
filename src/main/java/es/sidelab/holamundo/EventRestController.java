package es.sidelab.holamundo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventRestController {
	
	@Autowired
	private EventService eventService;
	
	@RequestMapping(value = "/events", method = RequestMethod.GET)
	public List<Event> getEvents() {
		return eventService.getEvents();
	}
	
	@RequestMapping(value = "/events/{eventName}", method = RequestMethod.GET)
	public Event getEvent(@PathVariable("eventName") String eventName) {
		return eventService.getEvent(eventName);
	}
	
	@RequestMapping(value = "/events", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addEvent(@RequestBody Event event) {		
		
		String auxNameToCompare = eventService.getEvent(event.getEventName()).getEventName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(event.getEventName())) {
			System.out.println("The event " + event.getEventName() + " already exists!");
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		} else {
			eventService.addEvent(event);
			System.out.println("The event " + auxNameToCompare + " was added!");
			System.out.println(auxNameToCompare.contains(event.getEventName()));
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}
		
	}
	
	@RequestMapping(value = "/events", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> updateEvent(@RequestBody Event event) {		
		
		String auxNameToCompare = eventService.getEvent(event.getEventName()).getEventName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(event.getEventName())) {
			System.out.println("The event " + event.getEventName() + " was found! Updating...");
			eventService.updateEvent(event);
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		} else {
			System.out.println("The event " + auxNameToCompare + " doesn't existss! Aborting update.");
			System.out.println(auxNameToCompare.contains(event.getEventName()));
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		}
		
	}
}

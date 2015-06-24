package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class EventService implements CommandLineRunner{
	
	@Autowired
	private EventRepositoryInterface eventRepo;
	
	private Event FindEvent (String eventName) {
		Event aux = new Event();
		System.out.println("The query is: " + eventName);
		for (Event event : getEvents()) {
			if (event.getEventName().equals(eventName)) {
				
				aux.setAllEvent(event);
			}
		}
		
		return aux;
	}
	
	public List<Event> getEvents() {
		return (List<Event>) eventRepo.findAll();
	}
	
	public Event getEvent(String eventName) {
		Event aux = FindEvent(eventName);
		System.out.println("The event is: " + aux.getEventName());
		return aux;
	}
	
	public void addEvent(Event event) {
		if (getEvents() == null) {
			eventRepo.save(new ArrayList<Event>());
		}
		eventRepo.save(event);
	}
	
	public void deleteEvent(Event event) {
		eventRepo.delete(event);
	}
	
	public void updateEvent (Event event) {
		Event aux = new Event();
		List<Event> auxList = getEvents();
		if (getEvent(event.getEventName()).getEventName() != null) {
			aux = getEvent(event.getEventName());
			//auxList.add(user);
		}
		//deleteUser(getUser(user.getUserName()));
		aux.setAllEvent(event);
		List<Event> auxListToDelete = new ArrayList<Event>();
		try {
			auxListToDelete = new ArrayList<Event>(DeleteAllExceptOne(event.getEventName(), auxList));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		eventRepo.delete(auxListToDelete);
		//userRepo.deleteAll();
		eventRepo.save(aux);
	}
	
	private List<Event> DeleteAllExceptOne (String eventName, List<Event> listToPrepare) throws Exception {
		List<Event> copyToReturn = new ArrayList<Event>(listToPrepare);
		if (listToPrepare == null || listToPrepare.isEmpty()) {
			throw new Exception("The list of events to delete is empty or null");
		} else {
			for (Event event : listToPrepare) {
				if (event.getEventName().equals(eventName)) {
					// DO NOTHING
					System.out.println("NOT removing from the copyToReturn: " + event.getEventName().toString());
				} else {
					System.out.println("Removing from the copyToReturn: " + event.getEventName().toString());
					copyToReturn.remove(event);
				}
			}
			
			return copyToReturn;
		}
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}

}

package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventRepositoryInterface extends CrudRepository<Event, Long> {
	
	List<Event> findByEventName(String eventName);

}
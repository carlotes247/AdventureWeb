package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepositoryInterface extends CrudRepository<Team, Long> {
	
	List<Team> findByName(String name);

}

package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface AudioRepositoryInterface extends CrudRepository<Audio, Long>{
	
	List<Audio> findByAudioName(String imageName);

}

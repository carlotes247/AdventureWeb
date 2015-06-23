package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ImageRespositoryInterface extends CrudRepository<Image, Long> {
	
	List<Image> findByImageName(String imageName);

}

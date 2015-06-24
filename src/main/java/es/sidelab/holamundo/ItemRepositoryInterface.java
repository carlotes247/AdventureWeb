package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ItemRepositoryInterface extends CrudRepository<Item, Long> {

	List<Item> findByItemName(String imageName);
}

package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepositoryInterface extends CrudRepository<CustomerEntity, Long>{

	List<CustomerEntity> findByLastName(String lastName);
	
	List<CustomerEntity> findByFirstName(String firstName);
	
}

package es.sidelab.holamundo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface UserRepositoryInterface extends CrudRepository<User, Long>{

	List<User> findByUserName(String userName);
	
	List<User> findByPassword(String password);
}

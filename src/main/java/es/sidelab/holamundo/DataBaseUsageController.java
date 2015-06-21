package es.sidelab.holamundo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataBaseUsageController implements CommandLineRunner {
	
	@Autowired
	private CustomerRepositoryInterface repository;
	
	@Override
	public void run(String... args) throws Exception {
		
		repository.save(new CustomerEntity("Jack", "Bauer"));
		repository.save(new CustomerEntity("TElmo", "Bauer"));
		repository.save(new CustomerEntity("Chloe", "O'Brian"));
		
		List<CustomerEntity> bauers = repository.findByLastName("Bauer");
		for (CustomerEntity bauer : bauers) {
			System.out.println(bauer);
		}
		
		repository.delete(bauers.get(0));
		
		bauers.clear();
		bauers = repository.findByLastName("Bauer");
		for (CustomerEntity bauer : bauers) {
			System.out.println("After deleting: "+bauer);
		}
	}

}

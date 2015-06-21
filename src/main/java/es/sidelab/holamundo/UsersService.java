package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class UsersService implements CommandLineRunner{
	
	@Autowired
	private UserRepositoryInterface userRepo;
	
	private int numUsers;

	public void setNumUsers(int numUsers) {
		this.numUsers = numUsers;
	}



	public int getNumUsers(){
		return numUsers;
	}
	
	private User FindUser (String userName) {
		User aux = new User();
		System.out.println("The query is: " + userName);
		for (User user : getUsers()) {
			if (user.getUserName().equals(userName)) {
				
				aux.setUserName(user.getUserName());
				aux.setPassword(user.getPassword());
			}
		}
		
		return aux;
	}
	
	public List<User> getUsers() {
		return (List<User>) userRepo.findAll();
	}
	
	public User getUser(String userName) {
		User aux = FindUser(userName);
		System.out.println("The user is: " + aux.getUserName());
		return aux;
	}
	
	public void addUser(User user) {
		if (getUsers() == null) {
			userRepo.save(new ArrayList<User>());
		}
		userRepo.save(user);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
}

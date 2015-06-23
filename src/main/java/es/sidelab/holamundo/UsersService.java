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
				
				//aux.setUserName(user.getUserName());
				//aux.setPassword(user.getPassword());
				aux.setAllUser(user);
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
	
	public String getUserPassword(String userName, String password) {
		User aux = getUser(userName);
		System.out.println("The user password is: " + aux.getPassword());
		return aux.getPassword();
	}
	
	public void addUser(User user) {
		if (getUsers() == null) {
			userRepo.save(new ArrayList<User>());
		}
		userRepo.save(user);
	}
	
	public void deleteUser(User user) {
		userRepo.delete(user);
	}
	
	public void updateUser (User user) {
		User aux = new User();
		List<User> auxList = getUsers();
		if (getUser(user.getUserName()).getUserName() != null) {
			aux = getUser(user.getUserName());
			//auxList.add(user);
		}
		//deleteUser(getUser(user.getUserName()));
		aux.setAllUser(user);
		List<User> auxListToDelete = new ArrayList<User>();
		try {
			auxListToDelete = new ArrayList<User>(DeleteAllExceptOne(user.getUserName(), auxList));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		userRepo.delete(auxListToDelete);
		//userRepo.deleteAll();
		userRepo.save(aux);
	}
	
	private List<User> DeleteAllExceptOne (String userName, List<User> listToPrepare) throws Exception {
		List<User> copyToReturn = new ArrayList<User>(listToPrepare);
		if (listToPrepare == null || listToPrepare.isEmpty()) {
			throw new Exception("The list to delete is empty or null");
		} else {
			for (User user : listToPrepare) {
				if (user.getUserName().equals(userName)) {
					// DO NOTHING
					System.out.println("NOT removing from the copyToReturn: " + user.getUserName().toString());
				} else {
					System.out.println("Removing from the copyToReturn: " + user.getUserName().toString());
					copyToReturn.remove(user);
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

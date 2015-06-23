package es.sidelab.holamundo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestController {
	
	@Autowired
	private UsersService usersService;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> getUsers() {
		return usersService.getUsers();
	}
	
	@RequestMapping(value = "/users/{userName}", method = RequestMethod.GET)
	public User getUser(@PathVariable("userName") String userName) {
		return usersService.getUser(userName);
	}
	
	@RequestMapping(value = "/users/{userName}/{password}", method = RequestMethod.GET)
	public String getUserPassword(@PathVariable("userName") String userName, @PathVariable("password") String password) {
		return "{\"" + usersService.getUserPassword(userName, password) + "\"}";
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addUser(@RequestBody User user) {		
		
		String auxNameToCompare = usersService.getUser(user.getUserName()).getUserName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(user.getUserName())) {
			System.out.println("The user " + user.getUserName() + " already exists!");
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		} else {
			usersService.addUser(user);
			System.out.println("The user " + auxNameToCompare + " was added!");
			System.out.println(auxNameToCompare.contains(user.getUserName()));
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}
		
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> updateUser(@RequestBody User user) {		
		
		String auxNameToCompare = usersService.getUser(user.getUserName()).getUserName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(user.getUserName())) {
			System.out.println("The user " + user.getUserName() + " was found! Updating...");
			usersService.updateUser(user);
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		} else {
			System.out.println("The user " + auxNameToCompare + " doesn't existss! Aborting update.");
			System.out.println(auxNameToCompare.contains(user.getUserName()));
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		}
		
	}

}

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
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addUser(@RequestBody User user) {
		usersService.addUser(user);
		
		return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
	}

}

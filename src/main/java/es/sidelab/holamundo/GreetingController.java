package es.sidelab.holamundo;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GreetingController {

	@Autowired
	private UsersService usersService;
	
	
	@RequestMapping("/greeting")
	public ModelAndView greeting(@RequestParam String name) {
		usersService.setNumUsers(10);
		return new ModelAndView("greeting_template")
			.addObject("userVar", usersService.getNumUsers() + " users")
			.addObject("name", name);
	}
	
	@RequestMapping("/dorota")
	public ModelAndView test() {
		return new ModelAndView("test_template").addObject("value", "DOROTA, CARLOS LOVE YOU WITH ALL HIS CORAZON");
	}
	
	@RequestMapping("/controller_route")
	public ModelAndView processForm(HttpSession sesion) {
		Object info = "information about the object is here! :D";
		sesion.setAttribute("info", info);
		return new ModelAndView("sesion_template").addObject("userSesion", sesion.getAttribute("info"));
	}
	
}

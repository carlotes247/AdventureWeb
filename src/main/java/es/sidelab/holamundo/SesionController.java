package es.sidelab.holamundo;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class SesionController {
	
	@Autowired
	private User user;
	
	private String sharedInfo;
	
	@RequestMapping(value="/processForm", method=RequestMethod.POST)
	public ModelAndView processForm(@RequestParam String info, HttpSession sesion) {
		user.setInfo(info);
		sharedInfo = info;
		sesion.setMaxInactiveInterval(8);
		return new ModelAndView("form_result");
	}
	
	@RequestMapping("/showData")
	public ModelAndView showData (HttpSession sesion) {
		String userInfo = (String) user.getInfo();
		return new ModelAndView("data_template")
			.addObject("userInfo", userInfo)
			.addObject("sharedInfo", sharedInfo)
			.addObject("userNew", sesion.isNew());
		
	}

}

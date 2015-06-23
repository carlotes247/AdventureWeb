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
public class ImageRestController {
	
	@Autowired
	private ImageService imageService;
	
	@RequestMapping(value = "/images", method = RequestMethod.GET)
	public List<Image> getImages() {
		return imageService.getImages();
	}
	
	@RequestMapping(value = "/images/{imageName}", method = RequestMethod.GET)
	public Image getImage(@PathVariable("imageName") String imageName) {
		return imageService.getImage(imageName);
	}
	
	@RequestMapping(value = "/images", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addImage(@RequestBody Image image) {		
		
		String auxNameToCompare = imageService.getImage(image.getImageName()).getImageName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(image.getImageName())) {
			System.out.println("The image " + image.getImageName() + " already exists!");
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		} else {
			imageService.addImage(image);
			System.out.println("The image " + auxNameToCompare + " was added!");
			System.out.println(auxNameToCompare.contains(image.getImageName()));
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}
		
	}
	
	@RequestMapping(value = "/images", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> updateImage(@RequestBody Image image) {		
		
		String auxNameToCompare = imageService.getImage(image.getImageName()).getImageName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(image.getImageName())) {
			System.out.println("The image " + image.getImageName() + " was found! Updating...");
			imageService.updateImage(image);
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		} else {
			System.out.println("The image " + auxNameToCompare + " doesn't existss! Aborting update.");
			System.out.println(auxNameToCompare.contains(image.getImageName()));
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		}
		
	}
}

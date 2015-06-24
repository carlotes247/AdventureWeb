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
public class ItemRestController {
	
	@Autowired
	private ItemService itemService;
	
	@RequestMapping(value = "/items", method = RequestMethod.GET)
	public List<Item> getItems() {
		return itemService.getItems();
	}
	
	@RequestMapping(value = "/items/{itemName}", method = RequestMethod.GET)
	public Item getItem(@PathVariable("itemName") String itemName) {
		return itemService.getItem(itemName);
	}
	
	@RequestMapping(value = "/items", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addItem(@RequestBody Item item) {		
		
		String auxNameToCompare = itemService.getItem(item.getItemName()).getItemName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(item.getItemName())) {
			System.out.println("The item " + item.getItemName() + " already exists!");
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		} else {
			itemService.addItem(item);
			System.out.println("The item " + auxNameToCompare + " was added!");
			System.out.println(auxNameToCompare.contains(item.getItemName()));
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}
		
	}
	
	@RequestMapping(value = "/items", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> updateItem(@RequestBody Item item) {		
		
		String auxNameToCompare = itemService.getItem(item.getItemName()).getItemName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(item.getItemName())) {
			System.out.println("The item " + item.getItemName() + " was found! Updating...");
			itemService.updateItem(item);
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		} else {
			System.out.println("The item " + auxNameToCompare + " doesn't existss! Aborting update.");
			System.out.println(auxNameToCompare.contains(item.getItemName()));
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		}
		
	}

}

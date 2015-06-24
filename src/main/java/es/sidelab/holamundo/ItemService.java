package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class ItemService implements CommandLineRunner {
	
	@Autowired
	private ItemRepositoryInterface itemRepo;
	
	private Item FindItem (String itemName) {
		Item aux = new Item();
		System.out.println("The query is: " + itemName);
		for (Item item : getItems()) {
			if (item.getItemName().equals(itemName)) {
				
				aux.setAllItem(item);
			}
		}
		
		return aux;
	}
	
	public List<Item> getItems() {
		return (List<Item>) itemRepo.findAll();
	}
	
	public Item getItem(String itemName) {
		Item aux = FindItem(itemName);
		System.out.println("The item is: " + aux.getItemName());
		return aux;
	}
	
	public void addItem(Item item) {
		if (getItems() == null) {
			itemRepo.save(new ArrayList<Item>());
		}
		itemRepo.save(item);
	}
	
	public void deleteItem(Item item) {
		itemRepo.delete(item);
	}
	
	public void updateItem (Item item) {
		Item aux = new Item();
		List<Item> auxList = getItems();
		if (getItem(item.getItemName()).getItemName() != null) {
			aux = getItem(item.getItemName());
			//auxList.add(user);
		}
		//deleteUser(getUser(user.getUserName()));
		aux.setAllItem(item);
		List<Item> auxListToDelete = new ArrayList<Item>();
		try {
			auxListToDelete = new ArrayList<Item>(DeleteAllExceptOne(item.getItemName(), auxList));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		itemRepo.delete(auxListToDelete);
		//userRepo.deleteAll();
		itemRepo.save(aux);
	}
	
	private List<Item> DeleteAllExceptOne (String itemName, List<Item> listToPrepare) throws Exception {
		List<Item> copyToReturn = new ArrayList<Item>(listToPrepare);
		if (listToPrepare == null || listToPrepare.isEmpty()) {
			throw new Exception("The list of items to delete is empty or null");
		} else {
			for (Item item : listToPrepare) {
				if (item.getItemName().equals(itemName)) {
					// DO NOTHING
					System.out.println("NOT removing from the copyToReturn: " + item.getItemName().toString());
				} else {
					System.out.println("Removing from the copyToReturn: " + item.getItemName().toString());
					copyToReturn.remove(item);
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

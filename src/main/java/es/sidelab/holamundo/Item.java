package es.sidelab.holamundo;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

@Entity
@Scope(value=WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String itemName;
	private String itemDescription;
	private String itemPrice;
	@OneToOne(cascade = {CascadeType.ALL})
	private Image itemImage;
	
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemDescription() {
		return itemDescription;
	}
	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}
	public Image getItemImage() {
		return itemImage;
	}
	public void setItemImage(Image itemImage) {
		this.itemImage = itemImage;
	}
	
	public String getItemPrice() {
		return itemPrice;
	}
	public void setItemPrice(String itemPrice) {
		this.itemPrice = itemPrice;
	}
	public void setAllItem(Item item) {
		setItemName(item.getItemName());
		setItemDescription(item.getItemDescription());
		setItemPrice(item.getItemPrice());
		setItemImage(item.getItemImage());

	}
	
}

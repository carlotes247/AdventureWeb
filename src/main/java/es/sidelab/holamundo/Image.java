package es.sidelab.holamundo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

@Entity
@Scope(value=WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String imageName;
	private String image;
	private String imageDescription;

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getImageDescription() {
		return imageDescription;
	}

	public void setImageDescription(String imageDescription) {
		this.imageDescription = imageDescription;
	}
	
	public void setAllImage(Image image) {
		setImageName(image.getImageName());
		setImage(image.getImage());
		setImageDescription(image.getImageDescription());
	}
	
	
}

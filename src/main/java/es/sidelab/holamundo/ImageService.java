package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;


@Service
public class ImageService implements CommandLineRunner{
	
	@Autowired
	private ImageRespositoryInterface imageRepo;
	
	private Image FindImage (String imageName) {
		Image aux = new Image();
		System.out.println("The query is: " + imageName);
		for (Image image : getImages()) {
			if (image.getImageName().equals(imageName)) {
				
				aux.setAllImage(image);
			}
		}
		
		return aux;
	}
	
	public List<Image> getImages() {
		return (List<Image>) imageRepo.findAll();
	}
	
	public Image getImage(String imageName) {
		Image aux = FindImage(imageName);
		System.out.println("The image is: " + aux.getImageName());
		return aux;
	}
	
	public void addImage(Image image) {
		if (getImages() == null) {
			imageRepo.save(new ArrayList<Image>());
		}
		imageRepo.save(image);
	}
	
	public void deleteImage(Image image) {
		imageRepo.delete(image);
	}
	
	public void updateImage (Image image) {
		Image aux = new Image();
		List<Image> auxList = getImages();
		if (getImage(image.getImageName()).getImageName() != null) {
			aux = getImage(image.getImageName());
			//auxList.add(user);
		}
		//deleteUser(getUser(user.getUserName()));
		aux.setAllImage(image);
		List<Image> auxListToDelete = new ArrayList<Image>();
		try {
			auxListToDelete = new ArrayList<Image>(DeleteAllExceptOne(image.getImageName(), auxList));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		imageRepo.delete(auxListToDelete);
		//userRepo.deleteAll();
		imageRepo.save(aux);
	}
	
	private List<Image> DeleteAllExceptOne (String imageName, List<Image> listToPrepare) throws Exception {
		List<Image> copyToReturn = new ArrayList<Image>(listToPrepare);
		if (listToPrepare == null || listToPrepare.isEmpty()) {
			throw new Exception("The list of images to delete is empty or null");
		} else {
			for (Image image : listToPrepare) {
				if (image.getImageName().equals(imageName)) {
					// DO NOTHING
					System.out.println("NOT removing from the copyToReturn: " + image.getImageName().toString());
				} else {
					System.out.println("Removing from the copyToReturn: " + image.getImageName().toString());
					copyToReturn.remove(image);
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

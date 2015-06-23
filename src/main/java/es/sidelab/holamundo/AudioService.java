package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class AudioService implements CommandLineRunner {
	
	@Autowired
	private AudioRepositoryInterface audioRepo;
	
	private Audio FindAudio (String audioName) {
		Audio aux = new Audio();
		System.out.println("The query is: " + audioName);
		for (Audio audio : getAudios()) {
			if (audio.getAudioName().equals(audioName)) {
				
				aux.setAllAudio(audio);
			}
		}
		
		return aux;
	}
	
	public List<Audio> getAudios() {
		return (List<Audio>) audioRepo.findAll();
	}
	
	public Audio getAudio(String audioName) {
		Audio aux = FindAudio(audioName);
		System.out.println("The audio is: " + aux.getAudioName());
		return aux;
	}
	
	public void addAudio(Audio audio) {
		if (getAudios() == null) {
			audioRepo.save(new ArrayList<Audio>());
		}
		audioRepo.save(audio);
	}
	
	public void deleteAudio(Audio audio) {
		audioRepo.delete(audio);
	}
	
	public void updateAudio (Audio audio) {
		Audio aux = new Audio();
		List<Audio> auxList = getAudios();
		if (getAudio(audio.getAudioName()).getAudioName() != null) {
			aux = getAudio(audio.getAudioName());
			//auxList.add(user);
		}
		//deleteUser(getUser(user.getUserName()));
		aux.setAllAudio(audio);
		List<Audio> auxListToDelete = new ArrayList<Audio>();
		try {
			auxListToDelete = new ArrayList<Audio>(DeleteAllExceptOne(audio.getAudioName(), auxList));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		audioRepo.delete(auxListToDelete);
		//userRepo.deleteAll();
		audioRepo.save(aux);
	}
	
	private List<Audio> DeleteAllExceptOne (String audioName, List<Audio> listToPrepare) throws Exception {
		List<Audio> copyToReturn = new ArrayList<Audio>(listToPrepare);
		if (listToPrepare == null || listToPrepare.isEmpty()) {
			throw new Exception("The list of audios to delete is empty or null");
		} else {
			for (Audio audio : listToPrepare) {
				if (audio.getAudioName().equals(audioName)) {
					// DO NOTHING
					System.out.println("NOT removing from the copyToReturn: " + audio.getAudioName().toString());
				} else {
					System.out.println("Removing from the copyToReturn: " + audio.getAudioName().toString());
					copyToReturn.remove(audio);
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

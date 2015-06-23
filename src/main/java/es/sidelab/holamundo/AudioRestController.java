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
public class AudioRestController {
	
	@Autowired
	private AudioService audioService;
	
	@RequestMapping(value = "/audios", method = RequestMethod.GET)
	public List<Audio> getAudios() {
		return audioService.getAudios();
	}
	
	@RequestMapping(value = "/audios/{audioName}", method = RequestMethod.GET)
	public Audio getAudio(@PathVariable("audioName") String audioName) {
		return audioService.getAudio(audioName);
	}
	
	@RequestMapping(value = "/audios", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addAudio(@RequestBody Audio audio) {		
		
		String auxNameToCompare = audioService.getAudio(audio.getAudioName()).getAudioName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(audio.getAudioName())) {
			System.out.println("The audio " + audio.getAudioName() + " already exists!");
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		} else {
			audioService.addAudio(audio);
			System.out.println("The audio " + auxNameToCompare + " was added!");
			System.out.println(auxNameToCompare.contains(audio.getAudioName()));
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}
		
	}
	
	@RequestMapping(value = "/audios", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> updateAudio(@RequestBody Audio audio) {		
		
		String auxNameToCompare = audioService.getAudio(audio.getAudioName()).getAudioName();
		
		if (auxNameToCompare == null) {
			auxNameToCompare = "";
		}
		
		if (auxNameToCompare.contains(audio.getAudioName())) {
			System.out.println("The audio " + audio.getAudioName() + " was found! Updating...");
			audioService.updateAudio(audio);
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		} else {
			System.out.println("The audio " + auxNameToCompare + " doesn't existss! Aborting update.");
			System.out.println(auxNameToCompare.contains(audio.getAudioName()));
			return new ResponseEntity<Boolean>(false, HttpStatus.CREATED);
		}
		
	}

}

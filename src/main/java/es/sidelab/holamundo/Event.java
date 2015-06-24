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
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String eventName;
	private String eventContent;
	private String eventGold;

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	
	public void setAllEvent(Event event) {
		setEventName(event.getEventName());
		setEventContent(event.getEventContent());
		setEventGold(event.getEventGold());
	}

	public String getEventContent() {
		return eventContent;
	}

	public void setEventContent(String eventContent) {
		this.eventContent = eventContent;
	}

	public String getEventGold() {
		return eventGold;
	}

	public void setEventGold(String eventGold) {
		this.eventGold = eventGold;
	}
	
	
}
package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Team {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@OneToMany(targetEntity=Player.class, fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Player> players;
	private String name;
	
	//Used by SpringData
	public Team(){
		this.name = "empty";
		this.players = new ArrayList<Player>();
	}
	
	public Team(String name, List<Player> players) {
		this.name = name;
		this.players = players;
	}

	//Getter and Setters
	public List<Player> getPlayers() {
		return players;
	}

	public void setPlayers(List<Player> players) {
		this.players = players;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}

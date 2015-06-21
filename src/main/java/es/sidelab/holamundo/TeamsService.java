package es.sidelab.holamundo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class TeamsService implements CommandLineRunner {
	
	@Autowired
	private TeamRepositoryInterface teamRepo;

	//private List<Team> teams;
	
	private Team FindTeam (String teamName) {
		Team aux = new Team();
		System.out.println("The query is: " + teamName);
		for (Team team : getTeams()) {
			if (team.getName().equals(teamName)) {
				//aux = team;
				aux.setName(team.getName());
				aux.setPlayers(team.getPlayers());
			}
		}
		
		return aux;
	}
	
	public List<Team> getTeams() {
		return (List<Team>) teamRepo.findAll();
		//return teams;
	}

	public Team getTeam(String teamName) {
		Team aux = FindTeam(teamName);
		System.out.println("The team is: " + aux.getName());
		return aux;
	}

	public void addTeam(Team team) {
		if (getTeams() == null) {
			//teams = new ArrayList<Team>();
			teamRepo.save(new ArrayList<Team>());
		}
		//teams.add(team);
		teamRepo.save(team);
	}

	@Override
	public void run(String... args) throws Exception {
		//teamRepo.save(teams);
	}

}

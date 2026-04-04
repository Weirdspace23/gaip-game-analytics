package com.gaip.gameanalytics;
import org.springframework.stereotype.Service;
import java.util.*;

import static java.util.Locale.of;

@Service
public class PlayerService {
   private final PlayerRepository playerRepository;

    public PlayerService( PlayerRepository playerRepository){
        this.playerRepository=playerRepository;
       }
    public List<Player> getAllPlayers(){
        return playerRepository.findAll();
    }

    public Player getPlayerByName(String name){
        return playerRepository.findByNameIgnoreCase(name).orElseThrow(()-> new PlayerNotFoundException(name));
    }
    public Player createPlayer(Player player){
        return playerRepository.save(player);
    }


}

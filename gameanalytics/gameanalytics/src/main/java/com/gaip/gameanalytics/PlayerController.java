package com.gaip.gameanalytics;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/players")
public class PlayerController {
    private final PlayerService playerService;
    private final PythonBridgeService pythonBridgeService;
    public PlayerController(PlayerService playerService, PythonBridgeService pythonBridgeService){
        this.playerService=playerService;
        this.pythonBridgeService=pythonBridgeService;
    }
    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/{name}")
    public Player getPlayerByName(@PathVariable String name) {
        return playerService.getPlayerByName(name);
    }
    @PostMapping
    public Player createPlayer(@RequestBody Player player){
        return playerService.createPlayer(player);
    }

    @GetMapping("/{name}/predict")
    public String predictPlayer(@PathVariable String name){
        Player player= playerService.getPlayerByName(name);
        return pythonBridgeService.getPlayerPrediction(
                player.getName(),
                player.getKdRatio(),
                player.getWinRate()
        );
   }
}

package com.gaip.gameanalytics;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchStatsController {
    private final  MatchStatsService matchStatsService;
    public MatchStatsController(MatchStatsService matchStatsService){
        this.matchStatsService=matchStatsService;
    }
    @PostMapping("/player/{playerId}")
    public MatchStats recordMatch(@PathVariable Long playerId,
                                  @RequestBody MatchStats matchStats){
        return matchStatsService.recordMatch(playerId,matchStats);
    }

    @GetMapping("/player/{playerId}")
    public List<MatchStats> getMatchesByPlayer(@PathVariable Long playerId){
        return matchStatsService.getMatchesByPlayer(playerId);
    }
}

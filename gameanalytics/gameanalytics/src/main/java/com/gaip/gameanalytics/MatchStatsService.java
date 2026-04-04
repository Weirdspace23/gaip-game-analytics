package com.gaip.gameanalytics;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MatchStatsService {
    private final MatchStatsRepository matchStatsRepository;
    private final PlayerRepository playerRepository;

    public MatchStatsService(MatchStatsRepository matchStatsRepository, PlayerRepository playerRepository) {
        this.matchStatsRepository = matchStatsRepository;
        this.playerRepository = playerRepository;
    }
    public MatchStats recordMatch(Long playerId,MatchStats matchStats){
        Player player= playerRepository.findById(playerId)
                .orElseThrow(()-> new PlayerNotFoundException("Player not found"));
        matchStats.setPlayer(player);
        MatchStats saved=matchStatsRepository.save(matchStats);

        List<MatchStats> allMatches=matchStatsRepository.findByPlayer(player);

        int totalKills= allMatches.stream().mapToInt(MatchStats::getKills).sum();
        int totalDeaths = allMatches.stream().mapToInt(MatchStats::getDeath).sum();
        long totalWins= allMatches.stream().filter(MatchStats::isWon).count();

        double kdRatio = totalDeaths>0 ?(double) totalKills/totalDeaths : totalKills;
        double winRate= (double)totalWins/allMatches.size();

        player.setKdRatio(Math.round(kdRatio*100.0)/100.0);
        player.setWinRate(Math.round(winRate*100.0)/100.0);
        playerRepository.save(player);

        return saved;
    }
    public List<MatchStats> getMatchesByPlayer(Long playerId){
        Player player =playerRepository.findById(playerId)
                .orElseThrow(()-> new PlayerNotFoundException("Player Not Found"));
        return matchStatsRepository.findByPlayer(player);
    }
}



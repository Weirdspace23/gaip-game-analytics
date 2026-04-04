package com.gaip.gameanalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface MatchStatsRepository extends JpaRepository<MatchStats,Long> {
    List<MatchStats> findByPlayer(Player player);
}

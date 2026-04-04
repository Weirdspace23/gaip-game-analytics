package com.gaip.gameanalytics;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player,Long>{
    Optional<Player> findByNameIgnoreCase(String name);

}

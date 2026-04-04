package com.gaip.gameanalytics;
import jakarta.persistence.*;

@Entity
@Table(name = "match_stats")

public class MatchStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int kills;
    private int deaths;
    private boolean won;
    private String matchDate;

    @ManyToOne
    @JoinColumn(name="player_id")

    private Player player;

    public MatchStats(){}

    public MatchStats(int kills,int deaths,boolean won,String matchDate,Player player){
        this.kills=kills;
        this.deaths=deaths;
        this.won=won;
        this.matchDate=matchDate;
        this.player=player;
    }
    public void setPlayer(Player player){
        this.player =player;
    }
    public void setMatchDate( String matchDate){
        this.matchDate=matchDate;
    }

    public Long getId(){ return id; }
    public int getKills(){ return kills;}
    public int getDeath(){ return deaths;}
    public boolean isWon() { return won; }
    public String getMatchDate() { return matchDate; }
    public Player getPlayer() { return player; }

}

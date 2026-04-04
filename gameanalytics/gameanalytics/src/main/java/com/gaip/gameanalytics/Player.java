package com.gaip.gameanalytics;

import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String game;
    private double kdRatio;
    private double winRate;

    public Player() {}

    public Player(String name, String game, double kdRatio, double winRate) {
        this.name = name;
        this.game = game;
        this.kdRatio = kdRatio;
        this.winRate = winRate;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getGame() { return game; }
    public double getKdRatio() { return kdRatio; }
    public double getWinRate() { return winRate; }

    public void setName(String name) { this.name = name; }
    public void setGame(String game) { this.game = game; }
    public void setKdRatio(double kdRatio) { this.kdRatio = kdRatio; }
    public void setWinRate(double winRate) { this.winRate = winRate; }

}

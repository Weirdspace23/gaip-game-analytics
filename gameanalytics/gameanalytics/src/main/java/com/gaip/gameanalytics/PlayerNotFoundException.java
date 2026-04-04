package com.gaip.gameanalytics;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException( String name){
        super("Player not found: "+name);
    }
}

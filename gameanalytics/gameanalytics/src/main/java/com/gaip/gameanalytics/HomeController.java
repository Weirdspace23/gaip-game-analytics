package com.gaip.gameanalytics;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {
    @GetMapping("/")
    public Map<String, Object> home() {
        return Map.of(
                "message", "Game Analytics API is running",
                "playersEndpoint", "/api/players"
        );
    }
}

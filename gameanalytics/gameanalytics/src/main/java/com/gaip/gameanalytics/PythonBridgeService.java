package com.gaip.gameanalytics;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PythonBridgeService {
    private final RestTemplate restTemplate;

    public PythonBridgeService(RestTemplate restTemplate){
        this.restTemplate=restTemplate;
    }
    public String getPlayerPrediction(String playerName, double kdRatio, double winRate) {
            String url = "http://localhost:5000/predict/" + playerName
                    + "?kdRatio=" + kdRatio
                    + "&winRate=" + winRate;
            System.out.println("Calling Python URL: "+url);
            return restTemplate.getForObject(url, String.class);
        }
    }


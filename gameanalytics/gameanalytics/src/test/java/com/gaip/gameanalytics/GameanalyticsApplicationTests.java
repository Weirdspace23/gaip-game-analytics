package com.gaip.gameanalytics;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GameanalyticsApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void homeEndpointLoads() throws Exception {
		mockMvc.perform(get("/"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.message").value("Game Analytics API is running"))
				.andExpect(jsonPath("$.playersEndpoint").value("/api/players"));
	}

	@Test
	void playersEndpointLoads() throws Exception {
		mockMvc.perform(get("/api/players"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name").value("Adam"))
				.andExpect(jsonPath("$[0].game").value("Valorant"))
				.andExpect(jsonPath("$[0].kdRatio").value(2.5))
				.andExpect(jsonPath("$[0].winRate").value(0.65));
	}

}

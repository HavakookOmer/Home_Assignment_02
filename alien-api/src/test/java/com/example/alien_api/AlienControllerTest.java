package com.example.alien_api;

import com.example.alien_api.model.*;
import com.example.alien_api.service.AlienService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AlienControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AlienService alienService;

    @BeforeEach
    public void setup() {
        List<Alien> aliens = alienService.getAllAliens();
        aliens.clear(); // Clear the list before each test
    }


    @Test
    public void addAlienWarrior_WithoutCommanderId_ShouldReturnBadRequest() throws Exception {
        AlienWarrior alienWarrior = new AlienWarrior();
        alienWarrior.setName("Alien Warrior 1");
        // Missing commanderId intentionally

        mockMvc.perform(post("/api/newAlien")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(alienWarrior)))
                .andExpect(status().isBadRequest());
    }


    @Test
    public void getAllAliens_ShouldReturnEmptyList() throws Exception {
        mockMvc.perform(get("/api/getAll"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    public void getAllAliens_ShouldReturnListOfAliens() throws Exception {
        AlienChiefCommander chiefCommander = new AlienChiefCommander();
        chiefCommander.setName("Chief Commander 1");
        alienService.addAlien(chiefCommander);

        AlienCommander commander = new AlienCommander();
        commander.setName("Commander 1");
        commander.setCommanderId(chiefCommander.getId());
        alienService.addAlien(commander);

        AlienWarrior alienWarrior = new AlienWarrior();
        alienWarrior.setName("Alien Warrior 1");
        alienWarrior.setCommanderId(commander.getId());
        alienWarrior.setWeapon(Weapon.WATER_GUN);
        alienService.addAlien(alienWarrior);

        mockMvc.perform(get("/api/getAll"))
                .andExpect(status().isOk())
                .andExpect(content().json("["
                        + "{\"id\":" + chiefCommander.getId()
                        + ",\"name\":\"Chief Commander 1\",\"type\":\"chief_commander\"},"
                        + "{\"id\":" + commander.getId() + ",\"name\":\"Commander 1\",\"commanderId\":"
                        + chiefCommander.getId() + ",\"type\":\"commander\"},"
                        + "{\"id\":" + alienWarrior.getId() + ",\"name\":\"Alien Warrior 1\",\"commanderId\":"
                        + commander.getId() + ",\"weapon\":\"WATER_GUN\",\"type\":\"warrior\"}"
                        + "]"));
    }
}

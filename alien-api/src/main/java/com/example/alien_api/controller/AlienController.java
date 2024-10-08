package com.example.alien_api.controller;

import com.example.alien_api.model.Alien;
import com.example.alien_api.service.AlienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AlienController {
    @Autowired
    private AlienService alienService;

    // API to add a new alien
    // POST /api/newAlien
    // Request Body: Alien object
    // Returns: ResponseEntity with the added Alien object or error message
    @PostMapping("/newAlien")
    public ResponseEntity<Object> addNewAlien(@RequestBody Alien alien) {
        try {
            Alien addedAlien = alienService.addAlien(alien);
            return ResponseEntity.ok().body(addedAlien);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // API to get all aliens
    // GET /api/getAll
    // Returns: ResponseEntity with a list of all Alien objects
    @GetMapping("/getAll")
    public ResponseEntity<List<Alien>> getAllAliens() {
        List<Alien> aliens = alienService.getAllAliens();
        return ResponseEntity.ok().body(aliens);
    }
}

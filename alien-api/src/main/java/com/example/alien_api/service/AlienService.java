package com.example.alien_api.service;

import com.example.alien_api.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class AlienService {
    private final List<Alien> aliens = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong();

    public Alien addAlien(Alien alien) {
        if (alien instanceof AlienChiefCommander) {
            validateAlienChiefCommander((AlienChiefCommander) alien);
        } else if (alien instanceof AlienCommander) {
            validateAlienCommander((AlienCommander) alien);
        } else if (alien instanceof AlienWarrior) {
            validateAlienWarrior((AlienWarrior) alien);
        } else {
            throw new IllegalArgumentException("Unknown alien type.");
        }

        alien.setId(idCounter.incrementAndGet());
        aliens.add(alien);
        
        if (alien.getCommanderId() != null) {
            boolean commanderFound = false;
            for (Alien existingAlien : aliens) {
                if (existingAlien.getId().equals(alien.getCommanderId())) {
                    existingAlien.addSubordinate(alien);
                    commanderFound = true;
                    break;
                }
            }
            if (!commanderFound) {
                throw new IllegalArgumentException("Commander with ID " + alien.getCommanderId() + " not found.");
            }
        }

        return alien;
    }

    public List<Alien> getAllAliens() {
        return aliens;
    }

    private void validateAlienChiefCommander(AlienChiefCommander chiefCommander) {
        if (chiefCommander.getCommanderId() != null) {
            throw new IllegalArgumentException("Commander ID should be null for AlienChiefCommander.");
        }
    }

    private void validateAlienCommander(AlienCommander commander) {
        if (commander.getCommanderId() == null || commander.getCommanderId() <= 0) {
            throw new IllegalArgumentException("Commander ID is required and should be a positive number for AlienCommander.");
        }
        
        int subordinateCount = 0;
        for (Alien alien : aliens) {
            if (alien instanceof AlienCommander && alien.getCommanderId() != null && alien.getCommanderId().equals(commander.getCommanderId())) {
                subordinateCount++;
            }
        }
        
        if (subordinateCount >= 10) {
            throw new IllegalArgumentException("Cannot add more than 10 warriors to a commander.");
        }
    }

    private void validateAlienWarrior(AlienWarrior warrior) {
        if (warrior.getCommanderId() == null || warrior.getCommanderId() <= 0) {
            throw new IllegalArgumentException("Commander ID is required and should be a positive number for AlienWarrior.");
        }

        boolean commanderFound = false;
        for (Alien alien : aliens) {
            if (alien.getId().equals(warrior.getCommanderId()) && alien instanceof AlienCommander) {
                commanderFound = true;
                break;
            }
        }

        if (!commanderFound) {
            throw new IllegalArgumentException("Commander with ID " + warrior.getCommanderId() + " not found or is not an AlienCommander.");
        }
    }
}

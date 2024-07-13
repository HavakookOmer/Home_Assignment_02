package com.example.alien_api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.example.alien_api.model.Alien;
import com.example.alien_api.model.AlienChiefCommander;
import com.example.alien_api.model.AlienCommander;
import com.example.alien_api.model.AlienWarrior;

@Service
public class AlienService {
    private final List<Alien> aliens = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong();

    public Alien addAlien(Alien alien) {
        validateAlien(alien);
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

    private void validateAlien(Alien alien) {
        if (alien instanceof AlienChiefCommander) {
            validateAlienChiefCommander((AlienChiefCommander) alien);
        } else if (alien instanceof AlienCommander) {
            validateAlienCommander((AlienCommander) alien);
        } else if (alien instanceof AlienWarrior) {
            validateAlienWarrior((AlienWarrior) alien);
        } else {
            throw new IllegalArgumentException("Unknown alien type.");
        }
    }

    private void validateAlienChiefCommander(AlienChiefCommander chiefCommander) {
        if (chiefCommander.getCommanderId() != null) {
            throw new IllegalArgumentException("Commander ID should be null for AlienChiefCommander.");
        }
    }

    private void validateAlienCommander(AlienCommander commander) {
        if (commander.getCommanderId() == null || commander.getCommanderId() <= 0) {
            throw new IllegalArgumentException(
                    "Commander ID is required and should be a positive number for AlienCommander.");
        }

        Alien commanderParent = commander.getCommanderId() != null ? aliens.stream()
                .filter(alien -> alien.getId().equals(commander.getCommanderId())).findFirst().orElse(null) : null;

        if (commanderParent == null || !(commanderParent instanceof AlienChiefCommander)) {
            throw new IllegalArgumentException("AlienCommander should have a Chief Commander as parent.");
        }
        if (commanderParent != null && commanderParent.getSubordinates().size() >= 3) {
            throw new IllegalArgumentException("Cannot add more than 3 commanders to a Chief Commander.");
        }

    }

    private void validateAlienWarrior(AlienWarrior warrior) {
        if (warrior.getCommanderId() == null || warrior.getCommanderId() <= 0) {
            throw new IllegalArgumentException(
                    "Commander ID is required and should be a positive number for AlienWarrior.");
        }

        Alien warriorCommander = warrior.getCommanderId() != null ? aliens.stream()
                .filter(alien -> alien.getId().equals(warrior.getCommanderId())).findFirst().orElse(null) : null;

        if (warriorCommander == null || !(warriorCommander instanceof AlienCommander)) {
            throw new IllegalArgumentException("AlienCommander should have a Chief Commander as parent.");
        }
        if (warriorCommander != null && warriorCommander.getSubordinates().size() >= 10) {
            throw new IllegalArgumentException("Cannot add more than 3 commanders to a Chief Commander.");
        }
    }
}

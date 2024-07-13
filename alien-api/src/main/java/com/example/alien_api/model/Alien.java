package com.example.alien_api.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.util.ArrayList;
import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = AlienWarrior.class, name = "warrior"),
        @JsonSubTypes.Type(value = AlienCommander.class, name = "commander"),
        @JsonSubTypes.Type(value = AlienChiefCommander.class, name = "chief_commander")
})
public abstract class Alien {

    private Long id;
    private String name;
    private Long commanderId;
    private List<Alien> subordinates = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCommanderId() {
        return commanderId;
    }

    public void setCommanderId(Long commanderId) {
        this.commanderId = commanderId;
    }

    public List<Alien> getSubordinates() {
        return subordinates;
    }

    public void addSubordinate(Alien alien) {
        this.subordinates.add(alien);
    }
}

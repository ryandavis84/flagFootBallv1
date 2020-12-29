package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A League.
 */
@Entity
@Table(name = "league")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class League implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "league")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Player> playerIds = new HashSet<>();

    @OneToMany(mappedBy = "league")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Team> teamIds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "leagueIds", allowSetters = true)
    private Season season;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public League name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Player> getPlayerIds() {
        return playerIds;
    }

    public League playerIds(Set<Player> players) {
        this.playerIds = players;
        return this;
    }

    public League addPlayerId(Player player) {
        this.playerIds.add(player);
        player.setLeague(this);
        return this;
    }

    public League removePlayerId(Player player) {
        this.playerIds.remove(player);
        player.setLeague(null);
        return this;
    }

    public void setPlayerIds(Set<Player> players) {
        this.playerIds = players;
    }

    public Set<Team> getTeamIds() {
        return teamIds;
    }

    public League teamIds(Set<Team> teams) {
        this.teamIds = teams;
        return this;
    }

    public League addTeamId(Team team) {
        this.teamIds.add(team);
        team.setLeague(this);
        return this;
    }

    public League removeTeamId(Team team) {
        this.teamIds.remove(team);
        team.setLeague(null);
        return this;
    }

    public void setTeamIds(Set<Team> teams) {
        this.teamIds = teams;
    }

    public Season getSeason() {
        return season;
    }

    public League season(Season season) {
        this.season = season;
        return this;
    }

    public void setSeason(Season season) {
        this.season = season;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof League)) {
            return false;
        }
        return id != null && id.equals(((League) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "League{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

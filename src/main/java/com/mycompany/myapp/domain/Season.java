package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Season.
 */
@Entity
@Table(name = "season")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Season implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "season")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Player> playerIds = new HashSet<>();

    @OneToMany(mappedBy = "season")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Team> teamIds = new HashSet<>();

    @OneToMany(mappedBy = "season")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<League> leagueIds = new HashSet<>();

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

    public Season name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Player> getPlayerIds() {
        return playerIds;
    }

    public Season playerIds(Set<Player> players) {
        this.playerIds = players;
        return this;
    }

    public Season addPlayerId(Player player) {
        this.playerIds.add(player);
        player.setSeason(this);
        return this;
    }

    public Season removePlayerId(Player player) {
        this.playerIds.remove(player);
        player.setSeason(null);
        return this;
    }

    public void setPlayerIds(Set<Player> players) {
        this.playerIds = players;
    }

    public Set<Team> getTeamIds() {
        return teamIds;
    }

    public Season teamIds(Set<Team> teams) {
        this.teamIds = teams;
        return this;
    }

    public Season addTeamId(Team team) {
        this.teamIds.add(team);
        team.setSeason(this);
        return this;
    }

    public Season removeTeamId(Team team) {
        this.teamIds.remove(team);
        team.setSeason(null);
        return this;
    }

    public void setTeamIds(Set<Team> teams) {
        this.teamIds = teams;
    }

    public Set<League> getLeagueIds() {
        return leagueIds;
    }

    public Season leagueIds(Set<League> leagues) {
        this.leagueIds = leagues;
        return this;
    }

    public Season addLeagueId(League league) {
        this.leagueIds.add(league);
        league.setSeason(this);
        return this;
    }

    public Season removeLeagueId(League league) {
        this.leagueIds.remove(league);
        league.setSeason(null);
        return this;
    }

    public void setLeagueIds(Set<League> leagues) {
        this.leagueIds = leagues;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Season)) {
            return false;
        }
        return id != null && id.equals(((Season) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Season{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

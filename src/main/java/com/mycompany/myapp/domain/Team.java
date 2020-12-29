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
 * A Team.
 */
@Entity
@Table(name = "team")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "team")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Player> playerIds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "teamIds", allowSetters = true)
    private Coach coach;

    @ManyToOne
    @JsonIgnoreProperties(value = "teamIds", allowSetters = true)
    private League league;

    @ManyToOne
    @JsonIgnoreProperties(value = "teamIds", allowSetters = true)
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

    public Team name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Player> getPlayerIds() {
        return playerIds;
    }

    public Team playerIds(Set<Player> players) {
        this.playerIds = players;
        return this;
    }

    public Team addPlayerId(Player player) {
        this.playerIds.add(player);
        player.setTeam(this);
        return this;
    }

    public Team removePlayerId(Player player) {
        this.playerIds.remove(player);
        player.setTeam(null);
        return this;
    }

    public void setPlayerIds(Set<Player> players) {
        this.playerIds = players;
    }

    public Coach getCoach() {
        return coach;
    }

    public Team coach(Coach coach) {
        this.coach = coach;
        return this;
    }

    public void setCoach(Coach coach) {
        this.coach = coach;
    }

    public League getLeague() {
        return league;
    }

    public Team league(League league) {
        this.league = league;
        return this;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public Season getSeason() {
        return season;
    }

    public Team season(Season season) {
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
        if (!(o instanceof Team)) {
            return false;
        }
        return id != null && id.equals(((Team) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

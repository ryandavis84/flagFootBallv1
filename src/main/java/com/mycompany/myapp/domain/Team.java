package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "team_player",
               joinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id"))
    private Set<Player> players = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "teams", allowSetters = true)
    private Coach coach;

    @ManyToMany(mappedBy = "teams")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<League> ids = new HashSet<>();

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

    public Set<Player> getPlayers() {
        return players;
    }

    public Team players(Set<Player> players) {
        this.players = players;
        return this;
    }

    public Team addPlayer(Player player) {
        this.players.add(player);
        player.getIds().add(this);
        return this;
    }

    public Team removePlayer(Player player) {
        this.players.remove(player);
        player.getIds().remove(this);
        return this;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
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

    public Set<League> getIds() {
        return ids;
    }

    public Team ids(Set<League> leagues) {
        this.ids = leagues;
        return this;
    }

    public Team addId(League league) {
        this.ids.add(league);
        league.getTeams().add(this);
        return this;
    }

    public Team removeId(League league) {
        this.ids.remove(league);
        league.getTeams().remove(this);
        return this;
    }

    public void setIds(Set<League> leagues) {
        this.ids = leagues;
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

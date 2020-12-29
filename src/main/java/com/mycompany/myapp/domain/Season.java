package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

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

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private League league;

    @OneToMany(mappedBy = "season")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<League> leagues = new HashSet<>();

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

    public League getLeague() {
        return league;
    }

    public Season league(League league) {
        this.league = league;
        return this;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public Set<League> getLeagues() {
        return leagues;
    }

    public Season leagues(Set<League> leagues) {
        this.leagues = leagues;
        return this;
    }

    public Season addLeague(League league) {
        this.leagues.add(league);
        league.setSeason(this);
        return this;
    }

    public Season removeLeague(League league) {
        this.leagues.remove(league);
        league.setSeason(null);
        return this;
    }

    public void setLeagues(Set<League> leagues) {
        this.leagues = leagues;
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

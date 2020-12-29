package com.mycompany.myapp.domain;

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

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "league_id",
               joinColumns = @JoinColumn(name = "league_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "id_id", referencedColumnName = "id"))
    private Set<Team> ids = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "league_id",
               joinColumns = @JoinColumn(name = "league_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "id_id", referencedColumnName = "id"))
    private Set<Season> ids = new HashSet<>();

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

    public Set<Team> getIds() {
        return ids;
    }

    public League ids(Set<Team> teams) {
        this.ids = teams;
        return this;
    }

    public League addId(Team team) {
        this.ids.add(team);
        team.getIds().add(this);
        return this;
    }

    public League removeId(Team team) {
        this.ids.remove(team);
        team.getIds().remove(this);
        return this;
    }

    public void setIds(Set<Team> teams) {
        this.ids = teams;
    }

    public Set<Season> getIds() {
        return ids;
    }

    public League ids(Set<Season> seasons) {
        this.ids = seasons;
        return this;
    }

    public League addId(Season season) {
        this.ids.add(season);
        season.getIds().add(this);
        return this;
    }

    public League removeId(Season season) {
        this.ids.remove(season);
        season.getIds().remove(this);
        return this;
    }

    public void setIds(Set<Season> seasons) {
        this.ids = seasons;
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

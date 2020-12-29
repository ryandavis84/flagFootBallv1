package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.JerseySize;

/**
 * A Coach.
 */
@Entity
@Table(name = "coach")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Coach implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jersey_size", nullable = false)
    private JerseySize jerseySize;

    @OneToMany(mappedBy = "id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Team> ids = new HashSet<>();

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private EmergencyContact id;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Coach firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Coach lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public JerseySize getJerseySize() {
        return jerseySize;
    }

    public Coach jerseySize(JerseySize jerseySize) {
        this.jerseySize = jerseySize;
        return this;
    }

    public void setJerseySize(JerseySize jerseySize) {
        this.jerseySize = jerseySize;
    }

    public Set<Team> getIds() {
        return ids;
    }

    public Coach ids(Set<Team> teams) {
        this.ids = teams;
        return this;
    }

    public Coach addId(Team team) {
        this.ids.add(team);
        team.setId(this);
        return this;
    }

    public Coach removeId(Team team) {
        this.ids.remove(team);
        team.setId(null);
        return this;
    }

    public void setIds(Set<Team> teams) {
        this.ids = teams;
    }

    public EmergencyContact getId() {
        return id;
    }

    public Coach id(EmergencyContact emergencyContact) {
        this.id = emergencyContact;
        return this;
    }

    public void setId(EmergencyContact emergencyContact) {
        this.id = emergencyContact;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coach)) {
            return false;
        }
        return id != null && id.equals(((Coach) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Coach{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", jerseySize='" + getJerseySize() + "'" +
            "}";
    }
}

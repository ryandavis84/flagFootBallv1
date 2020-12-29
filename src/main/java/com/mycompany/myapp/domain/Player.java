package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Player.
 */
@Entity
@Table(name = "player")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Player implements Serializable {

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
    @Column(name = "dob", nullable = false)
    private String dob;

    @NotNull
    @Column(name = "grade", nullable = false)
    private Integer grade;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private EmergencyContact id;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private ContactInfo id;

    @ManyToMany(mappedBy = "ids")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Team> ids = new HashSet<>();

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

    public Player firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Player lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDob() {
        return dob;
    }

    public Player dob(String dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public Integer getGrade() {
        return grade;
    }

    public Player grade(Integer grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Integer getAge() {
        return age;
    }

    public Player age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public EmergencyContact getId() {
        return id;
    }

    public Player id(EmergencyContact emergencyContact) {
        this.id = emergencyContact;
        return this;
    }

    public void setId(EmergencyContact emergencyContact) {
        this.id = emergencyContact;
    }

    public ContactInfo getId() {
        return id;
    }

    public Player id(ContactInfo contactInfo) {
        this.id = contactInfo;
        return this;
    }

    public void setId(ContactInfo contactInfo) {
        this.id = contactInfo;
    }

    public Set<Team> getIds() {
        return ids;
    }

    public Player ids(Set<Team> teams) {
        this.ids = teams;
        return this;
    }

    public Player addId(Team team) {
        this.ids.add(team);
        team.getIds().add(this);
        return this;
    }

    public Player removeId(Team team) {
        this.ids.remove(team);
        team.getIds().remove(this);
        return this;
    }

    public void setIds(Set<Team> teams) {
        this.ids = teams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        return id != null && id.equals(((Player) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", dob='" + getDob() + "'" +
            ", grade=" + getGrade() +
            ", age=" + getAge() +
            "}";
    }
}

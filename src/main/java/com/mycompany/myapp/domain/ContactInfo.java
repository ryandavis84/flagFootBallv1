package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.mycompany.myapp.domain.enumeration.ContactType;

/**
 * A ContactInfo.
 */
@Entity
@Table(name = "contact_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ContactInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ContactType type;

    @OneToOne
    @JoinColumn(unique = true)
    private Address addressId;

    @OneToOne(mappedBy = "emergencyId")
    @JsonIgnore
    private Player emergencyContact;

    @OneToOne(mappedBy = "emergencyId")
    @JsonIgnore
    private Coach emergencyContact;

    @OneToOne(mappedBy = "personalId")
    @JsonIgnore
    private Player personalContact;

    @OneToOne(mappedBy = "personalId")
    @JsonIgnore
    private Coach personalContact;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ContactType getType() {
        return type;
    }

    public ContactInfo type(ContactType type) {
        this.type = type;
        return this;
    }

    public void setType(ContactType type) {
        this.type = type;
    }

    public Address getAddressId() {
        return addressId;
    }

    public ContactInfo addressId(Address address) {
        this.addressId = address;
        return this;
    }

    public void setAddressId(Address address) {
        this.addressId = address;
    }

    public Player getEmergencyContact() {
        return emergencyContact;
    }

    public ContactInfo emergencyContact(Player player) {
        this.emergencyContact = player;
        return this;
    }

    public void setEmergencyContact(Player player) {
        this.emergencyContact = player;
    }

    public Coach getEmergencyContact() {
        return emergencyContact;
    }

    public ContactInfo emergencyContact(Coach coach) {
        this.emergencyContact = coach;
        return this;
    }

    public void setEmergencyContact(Coach coach) {
        this.emergencyContact = coach;
    }

    public Player getPersonalContact() {
        return personalContact;
    }

    public ContactInfo personalContact(Player player) {
        this.personalContact = player;
        return this;
    }

    public void setPersonalContact(Player player) {
        this.personalContact = player;
    }

    public Coach getPersonalContact() {
        return personalContact;
    }

    public ContactInfo personalContact(Coach coach) {
        this.personalContact = coach;
        return this;
    }

    public void setPersonalContact(Coach coach) {
        this.personalContact = coach;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContactInfo)) {
            return false;
        }
        return id != null && id.equals(((ContactInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContactInfo{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}

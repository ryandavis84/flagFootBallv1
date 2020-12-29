package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.EmergencyContact;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link EmergencyContact}.
 */
public interface EmergencyContactService {

    /**
     * Save a emergencyContact.
     *
     * @param emergencyContact the entity to save.
     * @return the persisted entity.
     */
    EmergencyContact save(EmergencyContact emergencyContact);

    /**
     * Get all the emergencyContacts.
     *
     * @return the list of entities.
     */
    List<EmergencyContact> findAll();


    /**
     * Get the "id" emergencyContact.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmergencyContact> findOne(Long id);

    /**
     * Delete the "id" emergencyContact.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

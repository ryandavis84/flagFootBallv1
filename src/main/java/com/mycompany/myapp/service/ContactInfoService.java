package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ContactInfo;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ContactInfo}.
 */
public interface ContactInfoService {

    /**
     * Save a contactInfo.
     *
     * @param contactInfo the entity to save.
     * @return the persisted entity.
     */
    ContactInfo save(ContactInfo contactInfo);

    /**
     * Get all the contactInfos.
     *
     * @return the list of entities.
     */
    List<ContactInfo> findAll();
    /**
     * Get all the ContactInfoDTO where EmergencyContact is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ContactInfo> findAllWhereEmergencyContactIsNull();
    /**
     * Get all the ContactInfoDTO where EmergencyContact is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ContactInfo> findAllWhereEmergencyContactIsNull();
    /**
     * Get all the ContactInfoDTO where PersonalContact is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ContactInfo> findAllWherePersonalContactIsNull();
    /**
     * Get all the ContactInfoDTO where PersonalContact is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ContactInfo> findAllWherePersonalContactIsNull();


    /**
     * Get the "id" contactInfo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ContactInfo> findOne(Long id);

    /**
     * Delete the "id" contactInfo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

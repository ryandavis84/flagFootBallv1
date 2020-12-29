package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Address;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Address}.
 */
public interface AddressService {

    /**
     * Save a address.
     *
     * @param address the entity to save.
     * @return the persisted entity.
     */
    Address save(Address address);

    /**
     * Get all the addresses.
     *
     * @return the list of entities.
     */
    List<Address> findAll();
    /**
     * Get all the AddressDTO where ContactInfo is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Address> findAllWhereContactInfoIsNull();


    /**
     * Get the "id" address.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Address> findOne(Long id);

    /**
     * Delete the "id" address.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

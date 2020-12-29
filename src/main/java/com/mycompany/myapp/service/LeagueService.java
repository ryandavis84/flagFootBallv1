package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.League;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link League}.
 */
public interface LeagueService {

    /**
     * Save a league.
     *
     * @param league the entity to save.
     * @return the persisted entity.
     */
    League save(League league);

    /**
     * Get all the leagues.
     *
     * @return the list of entities.
     */
    List<League> findAll();

    /**
     * Get all the leagues with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<League> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" league.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<League> findOne(Long id);

    /**
     * Delete the "id" league.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

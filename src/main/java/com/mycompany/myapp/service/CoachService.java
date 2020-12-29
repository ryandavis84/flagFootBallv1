package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Coach;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Coach}.
 */
public interface CoachService {

    /**
     * Save a coach.
     *
     * @param coach the entity to save.
     * @return the persisted entity.
     */
    Coach save(Coach coach);

    /**
     * Get all the coaches.
     *
     * @return the list of entities.
     */
    List<Coach> findAll();
    /**
     * Get all the CoachDTO where Id is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Coach> findAllWhereIdIsNull();


    /**
     * Get the "id" coach.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Coach> findOne(Long id);

    /**
     * Delete the "id" coach.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

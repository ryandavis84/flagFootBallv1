package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Player;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Player}.
 */
public interface PlayerService {

    /**
     * Save a player.
     *
     * @param player the entity to save.
     * @return the persisted entity.
     */
    Player save(Player player);

    /**
     * Get all the players.
     *
     * @return the list of entities.
     */
    List<Player> findAll();
    /**
     * Get all the PlayerDTO where EmergencyContact is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Player> findAllWhereEmergencyContactIsNull();
    /**
     * Get all the PlayerDTO where ContactInfo is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Player> findAllWhereContactInfoIsNull();


    /**
     * Get the "id" player.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Player> findOne(Long id);

    /**
     * Delete the "id" player.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

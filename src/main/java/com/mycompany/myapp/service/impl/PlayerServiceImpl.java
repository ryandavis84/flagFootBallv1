package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.PlayerService;
import com.mycompany.myapp.domain.Player;
import com.mycompany.myapp.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Player}.
 */
@Service
@Transactional
public class PlayerServiceImpl implements PlayerService {

    private final Logger log = LoggerFactory.getLogger(PlayerServiceImpl.class);

    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public Player save(Player player) {
        log.debug("Request to save Player : {}", player);
        return playerRepository.save(player);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Player> findAll() {
        log.debug("Request to get all Players");
        return playerRepository.findAll();
    }



    /**
     *  Get all the players where Id is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Player> findAllWhereIdIsNull() {
        log.debug("Request to get all players where Id is null");
        return StreamSupport
            .stream(playerRepository.findAll().spliterator(), false)
            .filter(player -> player.getId() == null)
            .collect(Collectors.toList());
    }


    /**
     *  Get all the players where Id is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Player> findAllWhereIdIsNull() {
        log.debug("Request to get all players where Id is null");
        return StreamSupport
            .stream(playerRepository.findAll().spliterator(), false)
            .filter(player -> player.getId() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Player> findOne(Long id) {
        log.debug("Request to get Player : {}", id);
        return playerRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Player : {}", id);
        playerRepository.deleteById(id);
    }
}

package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.LeagueService;
import com.mycompany.myapp.domain.League;
import com.mycompany.myapp.repository.LeagueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link League}.
 */
@Service
@Transactional
public class LeagueServiceImpl implements LeagueService {

    private final Logger log = LoggerFactory.getLogger(LeagueServiceImpl.class);

    private final LeagueRepository leagueRepository;

    public LeagueServiceImpl(LeagueRepository leagueRepository) {
        this.leagueRepository = leagueRepository;
    }

    @Override
    public League save(League league) {
        log.debug("Request to save League : {}", league);
        return leagueRepository.save(league);
    }

    @Override
    @Transactional(readOnly = true)
    public List<League> findAll() {
        log.debug("Request to get all Leagues");
        return leagueRepository.findAllWithEagerRelationships();
    }


    public Page<League> findAllWithEagerRelationships(Pageable pageable) {
        return leagueRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<League> findOne(Long id) {
        log.debug("Request to get League : {}", id);
        return leagueRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete League : {}", id);
        leagueRepository.deleteById(id);
    }
}

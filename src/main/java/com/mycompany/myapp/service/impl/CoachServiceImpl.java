package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CoachService;
import com.mycompany.myapp.domain.Coach;
import com.mycompany.myapp.repository.CoachRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Coach}.
 */
@Service
@Transactional
public class CoachServiceImpl implements CoachService {

    private final Logger log = LoggerFactory.getLogger(CoachServiceImpl.class);

    private final CoachRepository coachRepository;

    public CoachServiceImpl(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    @Override
    public Coach save(Coach coach) {
        log.debug("Request to save Coach : {}", coach);
        return coachRepository.save(coach);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Coach> findAll() {
        log.debug("Request to get all Coaches");
        return coachRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Coach> findOne(Long id) {
        log.debug("Request to get Coach : {}", id);
        return coachRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Coach : {}", id);
        coachRepository.deleteById(id);
    }
}

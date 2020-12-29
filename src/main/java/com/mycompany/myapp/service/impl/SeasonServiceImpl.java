package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.SeasonService;
import com.mycompany.myapp.domain.Season;
import com.mycompany.myapp.repository.SeasonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Season}.
 */
@Service
@Transactional
public class SeasonServiceImpl implements SeasonService {

    private final Logger log = LoggerFactory.getLogger(SeasonServiceImpl.class);

    private final SeasonRepository seasonRepository;

    public SeasonServiceImpl(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    @Override
    public Season save(Season season) {
        log.debug("Request to save Season : {}", season);
        return seasonRepository.save(season);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Season> findAll() {
        log.debug("Request to get all Seasons");
        return seasonRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Season> findOne(Long id) {
        log.debug("Request to get Season : {}", id);
        return seasonRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Season : {}", id);
        seasonRepository.deleteById(id);
    }
}

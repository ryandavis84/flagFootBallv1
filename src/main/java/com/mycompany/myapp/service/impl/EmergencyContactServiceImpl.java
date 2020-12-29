package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.EmergencyContactService;
import com.mycompany.myapp.domain.EmergencyContact;
import com.mycompany.myapp.repository.EmergencyContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link EmergencyContact}.
 */
@Service
@Transactional
public class EmergencyContactServiceImpl implements EmergencyContactService {

    private final Logger log = LoggerFactory.getLogger(EmergencyContactServiceImpl.class);

    private final EmergencyContactRepository emergencyContactRepository;

    public EmergencyContactServiceImpl(EmergencyContactRepository emergencyContactRepository) {
        this.emergencyContactRepository = emergencyContactRepository;
    }

    @Override
    public EmergencyContact save(EmergencyContact emergencyContact) {
        log.debug("Request to save EmergencyContact : {}", emergencyContact);
        return emergencyContactRepository.save(emergencyContact);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmergencyContact> findAll() {
        log.debug("Request to get all EmergencyContacts");
        return emergencyContactRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<EmergencyContact> findOne(Long id) {
        log.debug("Request to get EmergencyContact : {}", id);
        return emergencyContactRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmergencyContact : {}", id);
        emergencyContactRepository.deleteById(id);
    }
}

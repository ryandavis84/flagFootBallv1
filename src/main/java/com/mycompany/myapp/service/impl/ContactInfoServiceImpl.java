package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ContactInfoService;
import com.mycompany.myapp.domain.ContactInfo;
import com.mycompany.myapp.repository.ContactInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link ContactInfo}.
 */
@Service
@Transactional
public class ContactInfoServiceImpl implements ContactInfoService {

    private final Logger log = LoggerFactory.getLogger(ContactInfoServiceImpl.class);

    private final ContactInfoRepository contactInfoRepository;

    public ContactInfoServiceImpl(ContactInfoRepository contactInfoRepository) {
        this.contactInfoRepository = contactInfoRepository;
    }

    @Override
    public ContactInfo save(ContactInfo contactInfo) {
        log.debug("Request to save ContactInfo : {}", contactInfo);
        return contactInfoRepository.save(contactInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactInfo> findAll() {
        log.debug("Request to get all ContactInfos");
        return contactInfoRepository.findAll();
    }



    /**
     *  Get all the contactInfos where Id is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ContactInfo> findAllWhereIdIsNull() {
        log.debug("Request to get all contactInfos where Id is null");
        return StreamSupport
            .stream(contactInfoRepository.findAll().spliterator(), false)
            .filter(contactInfo -> contactInfo.getId() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ContactInfo> findOne(Long id) {
        log.debug("Request to get ContactInfo : {}", id);
        return contactInfoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContactInfo : {}", id);
        contactInfoRepository.deleteById(id);
    }
}

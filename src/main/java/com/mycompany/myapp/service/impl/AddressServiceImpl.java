package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.AddressService;
import com.mycompany.myapp.domain.Address;
import com.mycompany.myapp.repository.AddressRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Address}.
 */
@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    private final Logger log = LoggerFactory.getLogger(AddressServiceImpl.class);

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address save(Address address) {
        log.debug("Request to save Address : {}", address);
        return addressRepository.save(address);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Address> findAll() {
        log.debug("Request to get all Addresses");
        return addressRepository.findAll();
    }



    /**
     *  Get all the addresses where ContactInfo is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Address> findAllWhereContactInfoIsNull() {
        log.debug("Request to get all addresses where ContactInfo is null");
        return StreamSupport
            .stream(addressRepository.findAll().spliterator(), false)
            .filter(address -> address.getContactInfo() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Address> findOne(Long id) {
        log.debug("Request to get Address : {}", id);
        return addressRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Address : {}", id);
        addressRepository.deleteById(id);
    }
}

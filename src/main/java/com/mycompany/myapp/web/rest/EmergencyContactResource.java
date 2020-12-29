package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.EmergencyContact;
import com.mycompany.myapp.service.EmergencyContactService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.EmergencyContact}.
 */
@RestController
@RequestMapping("/api")
public class EmergencyContactResource {

    private final Logger log = LoggerFactory.getLogger(EmergencyContactResource.class);

    private static final String ENTITY_NAME = "emergencyContact";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmergencyContactService emergencyContactService;

    public EmergencyContactResource(EmergencyContactService emergencyContactService) {
        this.emergencyContactService = emergencyContactService;
    }

    /**
     * {@code POST  /emergency-contacts} : Create a new emergencyContact.
     *
     * @param emergencyContact the emergencyContact to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new emergencyContact, or with status {@code 400 (Bad Request)} if the emergencyContact has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/emergency-contacts")
    public ResponseEntity<EmergencyContact> createEmergencyContact(@Valid @RequestBody EmergencyContact emergencyContact) throws URISyntaxException {
        log.debug("REST request to save EmergencyContact : {}", emergencyContact);
        if (emergencyContact.getId() != null) {
            throw new BadRequestAlertException("A new emergencyContact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmergencyContact result = emergencyContactService.save(emergencyContact);
        return ResponseEntity.created(new URI("/api/emergency-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /emergency-contacts} : Updates an existing emergencyContact.
     *
     * @param emergencyContact the emergencyContact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emergencyContact,
     * or with status {@code 400 (Bad Request)} if the emergencyContact is not valid,
     * or with status {@code 500 (Internal Server Error)} if the emergencyContact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/emergency-contacts")
    public ResponseEntity<EmergencyContact> updateEmergencyContact(@Valid @RequestBody EmergencyContact emergencyContact) throws URISyntaxException {
        log.debug("REST request to update EmergencyContact : {}", emergencyContact);
        if (emergencyContact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmergencyContact result = emergencyContactService.save(emergencyContact);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, emergencyContact.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /emergency-contacts} : get all the emergencyContacts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of emergencyContacts in body.
     */
    @GetMapping("/emergency-contacts")
    public List<EmergencyContact> getAllEmergencyContacts() {
        log.debug("REST request to get all EmergencyContacts");
        return emergencyContactService.findAll();
    }

    /**
     * {@code GET  /emergency-contacts/:id} : get the "id" emergencyContact.
     *
     * @param id the id of the emergencyContact to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the emergencyContact, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/emergency-contacts/{id}")
    public ResponseEntity<EmergencyContact> getEmergencyContact(@PathVariable Long id) {
        log.debug("REST request to get EmergencyContact : {}", id);
        Optional<EmergencyContact> emergencyContact = emergencyContactService.findOne(id);
        return ResponseUtil.wrapOrNotFound(emergencyContact);
    }

    /**
     * {@code DELETE  /emergency-contacts/:id} : delete the "id" emergencyContact.
     *
     * @param id the id of the emergencyContact to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/emergency-contacts/{id}")
    public ResponseEntity<Void> deleteEmergencyContact(@PathVariable Long id) {
        log.debug("REST request to delete EmergencyContact : {}", id);
        emergencyContactService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

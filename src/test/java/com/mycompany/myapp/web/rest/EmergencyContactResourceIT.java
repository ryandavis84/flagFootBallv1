package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.FlagFootBallv1App;
import com.mycompany.myapp.domain.EmergencyContact;
import com.mycompany.myapp.repository.EmergencyContactRepository;
import com.mycompany.myapp.service.EmergencyContactService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmergencyContactResource} REST controller.
 */
@SpringBootTest(classes = FlagFootBallv1App.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmergencyContactResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;

    @Autowired
    private EmergencyContactService emergencyContactService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmergencyContactMockMvc;

    private EmergencyContact emergencyContact;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmergencyContact createEntity(EntityManager em) {
        EmergencyContact emergencyContact = new EmergencyContact()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME);
        return emergencyContact;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmergencyContact createUpdatedEntity(EntityManager em) {
        EmergencyContact emergencyContact = new EmergencyContact()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME);
        return emergencyContact;
    }

    @BeforeEach
    public void initTest() {
        emergencyContact = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmergencyContact() throws Exception {
        int databaseSizeBeforeCreate = emergencyContactRepository.findAll().size();
        // Create the EmergencyContact
        restEmergencyContactMockMvc.perform(post("/api/emergency-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emergencyContact)))
            .andExpect(status().isCreated());

        // Validate the EmergencyContact in the database
        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeCreate + 1);
        EmergencyContact testEmergencyContact = emergencyContactList.get(emergencyContactList.size() - 1);
        assertThat(testEmergencyContact.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testEmergencyContact.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
    }

    @Test
    @Transactional
    public void createEmergencyContactWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emergencyContactRepository.findAll().size();

        // Create the EmergencyContact with an existing ID
        emergencyContact.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmergencyContactMockMvc.perform(post("/api/emergency-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emergencyContact)))
            .andExpect(status().isBadRequest());

        // Validate the EmergencyContact in the database
        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emergencyContactRepository.findAll().size();
        // set the field null
        emergencyContact.setFirstName(null);

        // Create the EmergencyContact, which fails.


        restEmergencyContactMockMvc.perform(post("/api/emergency-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emergencyContact)))
            .andExpect(status().isBadRequest());

        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emergencyContactRepository.findAll().size();
        // set the field null
        emergencyContact.setLastName(null);

        // Create the EmergencyContact, which fails.


        restEmergencyContactMockMvc.perform(post("/api/emergency-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emergencyContact)))
            .andExpect(status().isBadRequest());

        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmergencyContacts() throws Exception {
        // Initialize the database
        emergencyContactRepository.saveAndFlush(emergencyContact);

        // Get all the emergencyContactList
        restEmergencyContactMockMvc.perform(get("/api/emergency-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emergencyContact.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)));
    }
    
    @Test
    @Transactional
    public void getEmergencyContact() throws Exception {
        // Initialize the database
        emergencyContactRepository.saveAndFlush(emergencyContact);

        // Get the emergencyContact
        restEmergencyContactMockMvc.perform(get("/api/emergency-contacts/{id}", emergencyContact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(emergencyContact.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingEmergencyContact() throws Exception {
        // Get the emergencyContact
        restEmergencyContactMockMvc.perform(get("/api/emergency-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmergencyContact() throws Exception {
        // Initialize the database
        emergencyContactService.save(emergencyContact);

        int databaseSizeBeforeUpdate = emergencyContactRepository.findAll().size();

        // Update the emergencyContact
        EmergencyContact updatedEmergencyContact = emergencyContactRepository.findById(emergencyContact.getId()).get();
        // Disconnect from session so that the updates on updatedEmergencyContact are not directly saved in db
        em.detach(updatedEmergencyContact);
        updatedEmergencyContact
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME);

        restEmergencyContactMockMvc.perform(put("/api/emergency-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmergencyContact)))
            .andExpect(status().isOk());

        // Validate the EmergencyContact in the database
        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeUpdate);
        EmergencyContact testEmergencyContact = emergencyContactList.get(emergencyContactList.size() - 1);
        assertThat(testEmergencyContact.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testEmergencyContact.getLastName()).isEqualTo(UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEmergencyContact() throws Exception {
        int databaseSizeBeforeUpdate = emergencyContactRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmergencyContactMockMvc.perform(put("/api/emergency-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emergencyContact)))
            .andExpect(status().isBadRequest());

        // Validate the EmergencyContact in the database
        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmergencyContact() throws Exception {
        // Initialize the database
        emergencyContactService.save(emergencyContact);

        int databaseSizeBeforeDelete = emergencyContactRepository.findAll().size();

        // Delete the emergencyContact
        restEmergencyContactMockMvc.perform(delete("/api/emergency-contacts/{id}", emergencyContact.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmergencyContact> emergencyContactList = emergencyContactRepository.findAll();
        assertThat(emergencyContactList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

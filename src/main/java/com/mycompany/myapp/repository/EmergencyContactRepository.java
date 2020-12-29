package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EmergencyContact;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EmergencyContact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
}

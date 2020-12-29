package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.League;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the League entity.
 */
@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {

    @Query(value = "select distinct league from League league left join fetch league.ids left join fetch league.ids",
        countQuery = "select count(distinct league) from League league")
    Page<League> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct league from League league left join fetch league.ids left join fetch league.ids")
    List<League> findAllWithEagerRelationships();

    @Query("select league from League league left join fetch league.ids left join fetch league.ids where league.id =:id")
    Optional<League> findOneWithEagerRelationships(@Param("id") Long id);
}

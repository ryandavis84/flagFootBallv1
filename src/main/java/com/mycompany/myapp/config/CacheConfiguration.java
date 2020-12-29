package com.mycompany.myapp.config;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mycompany.myapp.domain.User.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Authority.class.getName());
            createCache(cm, com.mycompany.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mycompany.myapp.domain.Season.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Season.class.getName() + ".leagues");
            createCache(cm, com.mycompany.myapp.domain.League.class.getName());
            createCache(cm, com.mycompany.myapp.domain.League.class.getName() + ".teams");
            createCache(cm, com.mycompany.myapp.domain.Team.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Team.class.getName() + ".players");
            createCache(cm, com.mycompany.myapp.domain.Player.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Address.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ContactInfo.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Coach.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Team.class.getName() + ".coaches");
            createCache(cm, com.mycompany.myapp.domain.EmergencyContact.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Season.class.getName() + ".ids");
            createCache(cm, com.mycompany.myapp.domain.League.class.getName() + ".seasons");
            createCache(cm, com.mycompany.myapp.domain.Team.class.getName() + ".ids");
            createCache(cm, com.mycompany.myapp.domain.Player.class.getName() + ".ids");
            createCache(cm, com.mycompany.myapp.domain.Coach.class.getName() + ".teams");
            createCache(cm, com.mycompany.myapp.domain.League.class.getName() + ".ids");
            createCache(cm, com.mycompany.myapp.domain.Coach.class.getName() + ".ids");
            createCache(cm, com.mycompany.myapp.domain.Season.class.getName() + ".playerIds");
            createCache(cm, com.mycompany.myapp.domain.Season.class.getName() + ".teamIds");
            createCache(cm, com.mycompany.myapp.domain.Season.class.getName() + ".leagueIds");
            createCache(cm, com.mycompany.myapp.domain.League.class.getName() + ".playerIds");
            createCache(cm, com.mycompany.myapp.domain.League.class.getName() + ".teamIds");
            createCache(cm, com.mycompany.myapp.domain.Team.class.getName() + ".playerIds");
            createCache(cm, com.mycompany.myapp.domain.Coach.class.getName() + ".teamIds");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}

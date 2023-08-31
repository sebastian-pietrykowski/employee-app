package com.bootcamp.backend.backend.skill;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SkillRepository extends JpaRepository<Skill, UUID> {
    List<Skill> findByNameContainingIgnoreCase(String term);
}

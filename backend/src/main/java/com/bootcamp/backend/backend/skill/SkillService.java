package com.bootcamp.backend.backend.skill;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public void deleteSkillById(Long id) {
        skillRepository.deleteById(id);
    }

    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> getSkillsByNameContaining(String term) {
        return skillRepository.findByNameContainingIgnoreCase(term);
    }

    public Skill updateSkill(Skill skill) {
        return skillRepository.save(skill);
    }
}

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
        if (skill.getId() != null && skillRepository.existsById(skill.getId())) {
            throw new SkillAlreadyExistsException();
        }

        return skillRepository.save(skill);
    }

    public void deleteSkillById(Long id) {
        Optional<Skill> foundSkill = skillRepository.findById(id);
        if (foundSkill.isEmpty()) {
            throw new SkillNotFoundException();
        }
        skillRepository.deleteById(id);
    }

    public Optional<Skill> getSkillById(Long id) {
        Optional<Skill> foundSkill = skillRepository.findById(id);
        if (foundSkill.isEmpty()) {
            throw new SkillNotFoundException();
        }

        return skillRepository.findById(id);
    }

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> getSkillsByNameContaining(String term) {
        return skillRepository.findByNameContainingIgnoreCase(term);
    }

    public Skill updateSkill(Long idFromPath, Skill skill) {
        if (!skill.getId().equals(idFromPath)) {
            throw new DifferentSkillIdInDatabaseException();
        }
        if (!skillRepository.existsById(skill.getId())) {
            throw new SkillNotFoundException();
        }

        return skillRepository.save(skill);
    }
}

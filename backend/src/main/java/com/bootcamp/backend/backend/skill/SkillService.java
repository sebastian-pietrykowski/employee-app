package com.bootcamp.backend.backend.skill;

import com.bootcamp.backend.backend.mappers.MapStructMapper;
import com.bootcamp.backend.backend.skill.exception.DifferentSkillIdInDatabaseException;
import com.bootcamp.backend.backend.skill.exception.SkillAlreadyExistsException;
import com.bootcamp.backend.backend.skill.exception.SkillNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;
    private final MapStructMapper mapStructMapper;

    public SkillDto addSkill(SkillDto skillDto) {
        Skill skill = mapStructMapper.skillDtotoSkill(skillDto);
        if (skill.getId() != null && skillRepository.existsById(skill.getId())) {
            throw new SkillAlreadyExistsException();
        }

        Skill savedSkill = skillRepository.save(skill);

        return mapStructMapper.skillToSkillDto(savedSkill);
    }

    public void deleteSkillById(UUID id) {
        Optional<Skill> foundSkill = skillRepository.findById(id);
        if (foundSkill.isEmpty()) {
            throw new SkillNotFoundException();
        }
        skillRepository.deleteById(id);
    }

    public Optional<SkillDto> getSkillById(UUID id) {
        return getSkillModelById(id).map(mapStructMapper::skillToSkillDto);
    }

    public Optional<Skill> getSkillModelById(UUID id) {
        Optional<Skill> foundSkill = skillRepository.findById(id);
        if (foundSkill.isEmpty()) {
            throw new SkillNotFoundException();
        }

        return Optional.ofNullable(foundSkill.get());
    }

    public List<SkillDto> getSkills() {
        List<Skill> foundSkills = skillRepository.findAll();
        return foundSkills.stream().map(mapStructMapper::skillToSkillDto).toList();
    }

    public List<SkillDto> getSkillsByNameContaining(String term) {
        List<Skill> foundSkills =  skillRepository.findByNameContainingIgnoreCase(term);
        return foundSkills.stream().map(mapStructMapper::skillToSkillDto).toList();
    }

    public SkillDto updateSkill(UUID idFromPath, SkillDto skillDto) {
        Skill skill = mapStructMapper.skillDtotoSkill(skillDto);
        if (areIdsNotEqual(idFromPath, skill.getId())) {
            throw new DifferentSkillIdInDatabaseException();
        }
        if (!skillRepository.existsById(skill.getId())) {
            throw new SkillNotFoundException();
        }

        Skill savedSkill = skillRepository.save(skill);

        return mapStructMapper.skillToSkillDto(savedSkill);
    }

    private boolean areIdsNotEqual(UUID idFromPath, UUID idFromBody) {
        return !idFromBody.equals(idFromPath);
    }
}

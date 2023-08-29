package com.bootcamp.backend.backend.skill;

import com.bootcamp.backend.backend.mappers.MapStructMapper;
import com.bootcamp.backend.backend.skill.exception.DifferentSkillIdInPathAndBodyException;
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
        checkIfSkillExists(skill);
        Skill savedSkill = skillRepository.save(skill);

        return mapStructMapper.skillToSkillDto(savedSkill);
    }

    public void deleteSkillById(UUID id) {
        skillRepository.findById(id).orElseThrow(() -> new SkillNotFoundException(id));
        skillRepository.deleteById(id);
    }

    public SkillDto getSkillById(UUID id) {
        Skill foundSkill = getSkillModelById(id);
        return mapStructMapper.skillToSkillDto(foundSkill);
    }

    public Skill getSkillModelById(UUID id) {
        return skillRepository.findById(id).orElseThrow(() -> new SkillNotFoundException(id));
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
        Skill skillWithUpdates = mapStructMapper.skillDtotoSkill(skillDto);
        checkIfIdsFromPathAndBodyMatch(idFromPath, skillWithUpdates.getId());
        checkIfSkillExists(skillWithUpdates);
        Skill savedSkill = skillRepository.save(skillWithUpdates);

        return mapStructMapper.skillToSkillDto(savedSkill);
    }

    private void checkIfIdsFromPathAndBodyMatch(UUID idFromPath, UUID idFromBody) {
        if (!idFromBody.equals(idFromPath)) {
            throw new DifferentSkillIdInPathAndBodyException(idFromPath, idFromBody);
        }
    }

    private void checkIfSkillExists(Skill skill) {
        if (skill.getId() != null && skillRepository.existsById(skill.getId())) {
            throw new SkillAlreadyExistsException(skill.getId());
        }
    }
}

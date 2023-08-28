package com.bootcamp.backend.backend.skill;

import com.bootcamp.backend.backend.skill.exception.SkillAlreadyExistsException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "skills", consumes = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin()
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<SkillDto> addSkill(
            @RequestBody @Valid SkillDto skillDto
    ) {
        try {
            SkillDto addedSkill = skillService.addSkill(skillDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedSkill);
        } catch (SkillAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<SkillDto>> getSkills() {
        List<SkillDto> skills = skillService.getSkills();
        return ResponseEntity.status(HttpStatus.OK).body(skills);
    }
}

package com.bootcamp.backend.backend.skill;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "skills", consumes = MediaType.APPLICATION_JSON_VALUE)
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<Skill> addSkill(
            @RequestBody @Valid Skill skill
    ) {
        try {
            Skill addedSkill = skillService.addSkill(skill);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedSkill);
        } catch (SkillAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills() {
        List<Skill> skills = skillService.getSkills();
        return ResponseEntity.status(HttpStatus.OK).body(skills);
    }
}

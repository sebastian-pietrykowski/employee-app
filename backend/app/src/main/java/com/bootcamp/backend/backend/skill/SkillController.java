package com.bootcamp.backend.backend.skill;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "skills")
@AllArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillDto> addSkill(
            @RequestBody @Valid SkillDto skillDto
    ) {
        SkillDto addedSkill = skillService.addSkill(skillDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedSkill);
    }

    @GetMapping
    public ResponseEntity<List<SkillDto>> getSkills() {
        List<SkillDto> skills = skillService.getSkills();
        return ResponseEntity.status(HttpStatus.OK).body(skills);
    }
}

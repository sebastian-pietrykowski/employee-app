package com.bootcamp.backend.backend.skill.exception;

import java.util.UUID;

public class SkillNotFoundException extends RuntimeException {
    public SkillNotFoundException(UUID id) {
        super(String.format("Skill [id=%s] was not found", id));
    }
}

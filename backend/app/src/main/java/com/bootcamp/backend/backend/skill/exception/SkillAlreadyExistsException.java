package com.bootcamp.backend.backend.skill.exception;

import java.util.UUID;

public class SkillAlreadyExistsException extends RuntimeException {
    public SkillAlreadyExistsException(UUID id) {
        super(String.format("Skill [id=%s] already exists", id));
    }
}

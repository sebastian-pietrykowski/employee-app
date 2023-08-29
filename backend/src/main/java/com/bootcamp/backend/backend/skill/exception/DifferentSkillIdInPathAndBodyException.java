package com.bootcamp.backend.backend.skill.exception;

import java.util.UUID;

public class DifferentSkillIdInPathAndBodyException extends RuntimeException {
    public DifferentSkillIdInPathAndBodyException(UUID idFromPath, UUID idFromBody) {
        super(String.format("Input skill [id=%s] in path, but [id=%s] in body", idFromPath, idFromBody));
    }
}

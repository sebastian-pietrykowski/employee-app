package com.bootcamp.backend.backend.project.exception;

import java.util.UUID;

public class DifferentProjectIdInPathAndBodyException extends RuntimeException {
    public DifferentProjectIdInPathAndBodyException(UUID idFromPath, UUID idFromBody) {
        super(String.format("Input project [id=%s] in path, but [id=%s] in body", idFromPath, idFromBody));
    }
}

package com.bootcamp.backend.backend.project.exception;

import java.util.UUID;

public class ProjectAlreadyExistsException extends RuntimeException {
    public ProjectAlreadyExistsException(UUID id) {
        super(String.format("Project [id=%s] already exists", id));
    }
}

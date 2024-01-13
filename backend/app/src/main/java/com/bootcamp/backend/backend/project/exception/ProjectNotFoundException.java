package com.bootcamp.backend.backend.project.exception;

import java.util.UUID;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(UUID id) {
        super(String.format("Project [id=%s] was not found", id));
    }
}

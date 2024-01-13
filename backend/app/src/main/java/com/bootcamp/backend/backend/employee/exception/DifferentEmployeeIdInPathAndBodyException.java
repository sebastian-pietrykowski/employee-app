package com.bootcamp.backend.backend.employee.exception;

import java.util.UUID;

public class DifferentEmployeeIdInPathAndBodyException extends RuntimeException {
    public DifferentEmployeeIdInPathAndBodyException(UUID idFromPath, UUID idFromBody) {
        super(String.format("Input employee [id=%s] in path, but [id=%s] in body", idFromPath, idFromBody));
    }
}

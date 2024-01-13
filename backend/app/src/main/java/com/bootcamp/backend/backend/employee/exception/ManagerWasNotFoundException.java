package com.bootcamp.backend.backend.employee.exception;

import java.util.UUID;

public class ManagerWasNotFoundException extends RuntimeException {
    public ManagerWasNotFoundException(UUID id) {
        super(String.format("Manager [id=%s] was not found", id));
    }
}

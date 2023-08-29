package com.bootcamp.backend.backend.employee.exception;

import java.util.UUID;

public class EmployeeAlreadyExistsException extends RuntimeException {
    public EmployeeAlreadyExistsException(UUID id) {
        super(String.format("Employee [id=%s] already exists", id));
    }
}

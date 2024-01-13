package com.bootcamp.backend.backend.employee.exception;

import java.util.UUID;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(UUID id) {
        super(String.format("Employee [id=%s] was not found", id));
    }
}

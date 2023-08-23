package com.bootcamp.backend.backend.exception;

import org.springframework.http.HttpStatus;

public record ApiError(
        HttpStatus status,
        String message) {
}

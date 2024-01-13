package com.bootcamp.backend.backend.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDate;

public record ApiError(
        String requestUrl,
        HttpStatus status,
        String message,
        LocalDate timestamp
) {
}

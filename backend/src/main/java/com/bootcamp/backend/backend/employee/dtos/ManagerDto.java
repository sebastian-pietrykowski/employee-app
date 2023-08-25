package com.bootcamp.backend.backend.employee.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public record ManagerDto(
        @NotEmpty
        @JsonProperty("id")
        UUID id,

        @NotEmpty
        @JsonProperty("name")
        String name,

        @NotEmpty
        @JsonProperty("surname")
        String surname
) {
}

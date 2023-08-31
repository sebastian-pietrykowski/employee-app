package com.bootcamp.backend.backend.employee.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public record ManagerDto(
        @NotEmpty(message = "Property 'id' is not defined")
        @JsonProperty("id")
        UUID id,

        @NotEmpty(message = "Property 'name' is not defined")
        @JsonProperty("name")
        String name,

        @NotEmpty(message = "Property 'surname' is not defined")
        @JsonProperty("surname")
        String surname
) {
}

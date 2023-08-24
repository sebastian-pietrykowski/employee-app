package com.bootcamp.backend.backend.employee.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

public record ManagerDTO(
        @NotEmpty
        @JsonProperty("id")
        String id,

        @NotEmpty
        @JsonProperty("name")
        String name,

        @NotEmpty
        @JsonProperty("surname")
        String surname
) {
}

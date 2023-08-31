package com.bootcamp.backend.backend.project;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record ProjectDto(
        @JsonProperty("id")
        UUID id,

        @NotBlank(message = "Property 'name' is not defined")
        @JsonProperty("name")
        String name
) {
}

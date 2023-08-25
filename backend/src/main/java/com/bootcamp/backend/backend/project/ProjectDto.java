package com.bootcamp.backend.backend.project;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public record ProjectDto(

        @JsonProperty("id")
        UUID id,

        @NotEmpty
        @JsonProperty("name")
        String name
) {
}

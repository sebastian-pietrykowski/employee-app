package com.bootcamp.backend.backend.skill;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record SkillDto(
        @JsonProperty("id")
        UUID id,

        @NotBlank(message = "Property 'name' is not defined")
        @JsonProperty("name")
        String name
) {
}

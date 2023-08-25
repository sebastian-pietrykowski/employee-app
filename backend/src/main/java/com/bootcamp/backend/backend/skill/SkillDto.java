package com.bootcamp.backend.backend.skill;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public record SkillDto(

        @JsonProperty("id")
        UUID id,

        @NotEmpty
        @JsonProperty("name")
        String name
) {
}

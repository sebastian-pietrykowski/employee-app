package com.bootcamp.backend.backend.employee.dtos;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public record EmployeeResponse(
        @NotEmpty
        @JsonProperty("id")
        UUID id,

        @NotEmpty
        @JsonProperty("name")
        String name,

        @NotEmpty
        @JsonProperty("surname")
        String surname,

        @NotNull
        @DateTimeFormat
        @JsonProperty("employmentDate")
        Date employmentDate,

        @NotNull
        @JsonProperty("projects")
        Set<Project> projects,

        @NotNull
        @JsonProperty("skills")
        Set<Skill> skills,

        @NotNull
        @JsonProperty("manager")
        Optional<ManagerDto> manager
) {
}

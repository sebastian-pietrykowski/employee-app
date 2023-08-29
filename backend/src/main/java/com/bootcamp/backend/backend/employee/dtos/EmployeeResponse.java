package com.bootcamp.backend.backend.employee.dtos;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public record EmployeeResponse(
        @NotEmpty(message = "Property 'id' is not defined")
        @JsonProperty("id")
        UUID id,

        @NotBlank(message = "Property 'name' is not defined")
        @JsonProperty("name")
        String name,

        @NotBlank(message = "Property 'surname' is not defined")
        @JsonProperty("surname")
        String surname,

        @NotNull(message = "Property 'employmentDate' is not defined")
        @DateTimeFormat
        @JsonProperty("employmentDate")
        Date employmentDate,

        @NotNull(message = "Property 'projects' is not defined")
        @JsonProperty("projects")
        Set<Project> projects,

        @NotNull(message = "Property 'skills' is not defined")
        @JsonProperty("skills")
        Set<Skill> skills,

        @NotNull(message = "Property 'manager' is not defined")
        @JsonProperty("manager")
        Optional<ManagerDto> manager
) {
}

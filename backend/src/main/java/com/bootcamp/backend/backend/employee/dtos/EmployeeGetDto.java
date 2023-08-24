package com.bootcamp.backend.backend.employee.dtos;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

public record EmployeeGetDto(
        @NotEmpty
        @JsonProperty("id")
        String id,

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
        ManagerDTO manager
) {
}

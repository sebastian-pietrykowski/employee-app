package com.bootcamp.backend.backend.employee.dtos;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

public record EmployeePostDto(
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
        @JsonProperty("projectIds")
        List<Long> projectIds,

        @NotNull
        @JsonProperty("skillIds")
        List<Long> skillIds,

        @NotNull
        @JsonProperty("managerId")
        String managerId
) {
}

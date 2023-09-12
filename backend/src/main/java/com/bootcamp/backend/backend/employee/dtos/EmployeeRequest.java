package com.bootcamp.backend.backend.employee.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Builder
public record EmployeeRequest(
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
        LocalDate employmentDate,

        @NotNull(message = "Property 'projectIds' is not defined")
        @JsonProperty("projectIds")
        List<UUID> projectIds,

        @NotNull(message = "Property 'skillIds' is not defined")
        @JsonProperty("skillIds")
        List<UUID> skillIds,

        @JsonProperty("managerId")
        Optional<UUID> managerId
) {
}

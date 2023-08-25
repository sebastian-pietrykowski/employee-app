package com.bootcamp.backend.backend.employee.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public record EmployeeRequest(
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
        @JsonProperty("projectIds")
        List<UUID> projectIds,

        @NotNull
        @JsonProperty("skillIds")
        List<UUID> skillIds,

        @JsonProperty("managerId")
        Optional<UUID> managerId
) {
}

package com.bootcamp.backend.backend.mappers;

import com.bootcamp.backend.backend.employee.Employee;
import com.bootcamp.backend.backend.employee.EmployeeService;
import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.project.ProjectService;
import com.bootcamp.backend.backend.skill.Skill;
import com.bootcamp.backend.backend.skill.SkillService;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record MapperEmployeeServiceContext(
        EmployeeService employeeService,
        ProjectService projectService,
        SkillService skillService
) {
    Set<Project> projectIdsToProjects(List<UUID> projectIds) {
        return projectIds.stream()
                .map(projectService::getProjectModelById)
                .flatMap(Optional::stream)
                .collect(Collectors.toSet());
    }

    Set<Skill> skillIdsToSkills(List<UUID> skillIds) {
        return skillIds.stream()
                .map(skillService::getSkillModelById)
                .flatMap(Optional::stream)
                .collect(Collectors.toSet());
    }

    Optional<Employee> employeeIdToEmployee(Optional<UUID> employeeId) {
        return employeeId.map(employeeService::getEmployeeModelById);
    }
}

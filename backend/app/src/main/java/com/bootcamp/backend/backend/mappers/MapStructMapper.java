package com.bootcamp.backend.backend.mappers;

import com.bootcamp.backend.backend.employee.Employee;
import com.bootcamp.backend.backend.employee.dtos.EmployeeRequest;
import com.bootcamp.backend.backend.employee.dtos.EmployeeResponse;
import com.bootcamp.backend.backend.employee.dtos.ManagerDto;
import com.bootcamp.backend.backend.employee.exception.EmployeeNotFoundException;
import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.project.ProjectDto;
import com.bootcamp.backend.backend.skill.Skill;
import com.bootcamp.backend.backend.skill.SkillDto;
import org.mapstruct.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Mapper(
        componentModel = "spring",
        builder = @Builder(disableBuilder = true)
)
public abstract class MapStructMapper {
    @Mapping(target = "projects", ignore = true)
    @Mapping(target = "skills", ignore = true)
    @Mapping(target = "manager", ignore = true)
    public abstract Employee employeeRequestToEmployee(
            EmployeeRequest employeeRequest,
            @Context MapperEmployeeServiceContext mapperEmployeeServiceContext
    );

    @AfterMapping
    public void projectIdsToProjects(
            EmployeeRequest employeeRequest,
            @MappingTarget Employee employee,
            @Context MapperEmployeeServiceContext mapperEmployeeServiceContext
    ) {
        List<UUID> projectIds = employeeRequest.projectIds();
        Set<Project> projects = mapperEmployeeServiceContext.projectIdsToProjects(projectIds);
        employee.setProjects(projects);
    }

    @AfterMapping
    public void skillIdsToSkills(
            EmployeeRequest employeeRequest,
            @MappingTarget Employee employee,
            @Context MapperEmployeeServiceContext mapperEmployeeServiceContext
    ) {
        List<UUID> skillIds = employeeRequest.skillIds();
        Set<Skill> skills = mapperEmployeeServiceContext.skillIdsToSkills(skillIds);
        employee.setSkills(skills);
    }

    @AfterMapping
    public void managerIdToEmployee(
            EmployeeRequest employeeRequest,
            @MappingTarget Employee mappedEmployee,
            @Context MapperEmployeeServiceContext mapperEmployeeServiceContext
    ) {
        Optional<UUID> managerId = employeeRequest.managerId();
        if (managerId.isPresent()) {
            Optional<Employee> foundManager = managerId.map(mapperEmployeeServiceContext::employeeIdToEmployee);
            mappedEmployee.setManager(foundManager.orElseThrow(
                    () -> new EmployeeNotFoundException(managerId.get())
            ));
        }
    }

    @Mapping(source = "employee.manager", target = "manager", qualifiedByName = "employeeToManagerDtoOptional")
    public abstract EmployeeResponse employeeToEmployeeResponse(Employee employee);

    public abstract ManagerDto employeeToManagerDto(Employee employee);

    public abstract Project projectDtoToProject(ProjectDto projectDto);

    public abstract ProjectDto projectToProjectDto(Project project);

    public abstract Skill skillDtotoSkill(SkillDto skillDto);

    public abstract SkillDto skillToSkillDto(Skill skill);

    @Named("employeeToManagerDtoOptional")
    protected Optional<ManagerDto> employeeToManagerDtoOptional(Employee employee) {
        return Optional.ofNullable(employee).map(e ->
                new ManagerDto(e.getId(), e.getName(), e.getSurname())
        );
    }
}

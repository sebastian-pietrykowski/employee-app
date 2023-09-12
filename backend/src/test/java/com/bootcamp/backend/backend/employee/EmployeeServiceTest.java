package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.employee.dtos.EmployeeRequest;
import com.bootcamp.backend.backend.employee.dtos.EmployeeResponse;
import com.bootcamp.backend.backend.employee.dtos.ManagerDto;
import com.bootcamp.backend.backend.employee.exception.DifferentEmployeeIdInPathAndBodyException;
import com.bootcamp.backend.backend.employee.exception.EmployeeAlreadyExistsException;
import com.bootcamp.backend.backend.employee.exception.EmployeeNotFoundException;
import com.bootcamp.backend.backend.employee.exception.ManagerWasNotFoundException;
import com.bootcamp.backend.backend.mappers.MapStructMapper;
import com.bootcamp.backend.backend.mappers.MapperEmployeeServiceContext;
import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.project.ProjectDto;
import com.bootcamp.backend.backend.project.ProjectService;
import com.bootcamp.backend.backend.skill.Skill;
import com.bootcamp.backend.backend.skill.SkillDto;
import com.bootcamp.backend.backend.skill.SkillService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EmployeeServiceTest {
    @Mock
    private EmployeeRepository employeeRepository;
    @Mock
    private MapStructMapper mapper;
    @Mock
    private ProjectService projectService;
    @Mock
    private SkillService skillService;
    private EmployeeService underTest;
    private Map<MockEmployeeType, EmployeeForms> mockEmployeeForms;
    private Map<MockProjectType, ProjectForms> mockProjectForms;
    private Map<MockSkillType, SkillForms> mockSkillForms;

    @BeforeAll
    void setUp() {
        mockEmployeeForms = new HashMap<>();
        mockProjectForms = new HashMap<>();
        mockSkillForms = new HashMap<>();
        generateProjects();
        generateSkills();
        generateEmployees();
    }

    @BeforeEach
    void setUpEach() {
        underTest = new EmployeeService(employeeRepository, mapper, projectService, skillService);
    }

    @Test
    void shouldAddEmployeeWhenNoProjectsNoSkillsNoManager() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        EmployeeRequest employeeRequest = changeIdInEmployeeRequest(null, employeeForms.employeeRequest());
        Employee employee = changeIdInEmployee(null, employeeForms.employee());
        EmployeeResponse employeeResponse = changeIdInEmployeeResponse(null, employeeForms.employeeResponse());

        when(mapper.employeeRequestToEmployee(eq(employeeRequest), any(MapperEmployeeServiceContext.class)))
                .thenReturn(employee);
        ArgumentCaptor<Employee> employeeArgumentCaptor = ArgumentCaptor.forClass(Employee.class);
        when(mapper.employeeToEmployeeResponse(employeeArgumentCaptor.capture())).thenAnswer(
                invocation -> changeIdInEmployeeResponse(
                        employeeArgumentCaptor.getValue().getId(), employeeResponse
                )
        );
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> {
                    Employee capturedEmployee = invocation.getArgument(0);
                    return changeIdInEmployee(UUID.randomUUID(), capturedEmployee);
                }
        );

        // when
        EmployeeResponse actualEmployee = underTest.addEmployee(employeeRequest);

        //then
        assertThat(actualEmployee.id()).isNotNull();
        assertThat(actualEmployee)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(employeeResponse);
    }

    @Test
    void shouldAddEmployeeWhenOneProjectOneSkillNoManager() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_NO_MANAGER);
        EmployeeRequest employeeRequest = changeIdInEmployeeRequest(null, employeeForms.employeeRequest());
        Employee employee = changeIdInEmployee(null, employeeForms.employee());
        EmployeeResponse employeeResponse = changeIdInEmployeeResponse(null, employeeForms.employeeResponse());

        when(mapper.employeeRequestToEmployee(eq(employeeRequest), any(MapperEmployeeServiceContext.class)))
                .thenReturn(employee);
        ArgumentCaptor<Employee> employeeArgumentCaptor = ArgumentCaptor.forClass(Employee.class);
        when(mapper.employeeToEmployeeResponse(employeeArgumentCaptor.capture())).thenAnswer(
                invocation -> changeIdInEmployeeResponse(
                        employeeArgumentCaptor.getValue().getId(), employeeResponse
                )
        );
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> {
                    Employee capturedEmployee = invocation.getArgument(0);
                    return changeIdInEmployee(UUID.randomUUID(), capturedEmployee);
                }
        );

        // when
        EmployeeResponse actualEmployee = underTest.addEmployee(employeeRequest);

        //then
        assertThat(actualEmployee.id()).isNotNull();
        assertThat(actualEmployee)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(employeeResponse);
    }

    @Test
    void shouldAddEmployeeWhenOneProjectOneSkillWithManager() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER);
        EmployeeRequest employeeRequest = changeIdInEmployeeRequest(null, employeeForms.employeeRequest());
        Employee employee = changeIdInEmployee(null, employeeForms.employee());
        EmployeeResponse employeeResponse = changeIdInEmployeeResponse(null, employeeForms.employeeResponse());

        when(mapper.employeeRequestToEmployee(eq(employeeRequest), any(MapperEmployeeServiceContext.class)))
                .thenReturn(employee);
        ArgumentCaptor<Employee> employeeArgumentCaptor = ArgumentCaptor.forClass(Employee.class);
        when(mapper.employeeToEmployeeResponse(employeeArgumentCaptor.capture())).thenAnswer(
                invocation -> changeIdInEmployeeResponse(
                        employeeArgumentCaptor.getValue().getId(), employeeResponse
                )
        );
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> {
                    Employee capturedEmployee = invocation.getArgument(0);
                    return changeIdInEmployee(UUID.randomUUID(), capturedEmployee);
                }
        );

        Employee savedManager = employeeRepository.save(employee.getManager());
        when(employeeRepository.existsById(savedManager.getId())).thenReturn(true);
        employeeRequest.managerId().map(id -> savedManager.getId());
        employee.getManager().setId(savedManager.getId());
        employeeResponse.manager().map(managerDto -> new ManagerDto(
                savedManager.getId(), managerDto.name(), managerDto.surname())
        );

        // when
        EmployeeResponse actualEmployee = underTest.addEmployee(employeeRequest);

        //then
        assertThat(actualEmployee.id()).isNotNull();
        assertThat(actualEmployee)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(employeeResponse);
    }

    @Test
    void shouldThrowExceptionWhenAddingAlreadyExistingEmployee() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_NO_MANAGER);
        EmployeeRequest employeeRequest = employeeForms.employeeRequest();
        Employee employee = employeeForms.employee();

        when(mapper.employeeRequestToEmployee(eq(employeeRequest), any(MapperEmployeeServiceContext.class)))
                .thenReturn(employee);
        when(employeeRepository.existsById(employee.getId())).thenReturn(true);

        // when then
        assertThatThrownBy(() -> underTest.addEmployee(employeeRequest))
                .isInstanceOf(EmployeeAlreadyExistsException.class)
                .hasMessageContaining(employee.getId().toString());
    }

    @Test
    void shouldThrowExceptionWhenTriedToAddEmployeeWhoseManagerWasNotFound() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER);
        EmployeeRequest employeeRequest = employeeForms.employeeRequest();
        Employee employee = employeeForms.employee();

        when(employeeRepository.existsById(employee.getId())).thenReturn(false);
        when(employeeRepository.existsById(employee.getManager().getId())).thenReturn(false);
        when(mapper.employeeRequestToEmployee(eq(employeeRequest), any(MapperEmployeeServiceContext.class)))
                .thenReturn(employee);

        // when then
        assertThatThrownBy(() -> underTest.addEmployee(employeeRequest))
                .isInstanceOf(ManagerWasNotFoundException.class)
                .hasMessageContaining(employee.getManager().getId().toString());
    }

    @Test
    void shouldDeleteEmployeeByIdWhenNoProjectsNoSkillsNoManager() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        Employee employee = employeeForms.employee();
        when(employeeRepository.findById(employee.getId())).thenReturn(Optional.of(employee));

        // when
        underTest.deleteEmployeeById(employee.getId());

        //then
        verify(employeeRepository, times(1)).deleteSafelyById(employee.getId());
    }

    @Test
    void shouldGetEmployeeModelByIdWhenNoProjectsNoSkillsNoManager() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        Employee employee = employeeForms.employee();
        when(employeeRepository.findById(employee.getId())).thenReturn(Optional.of(employee));

        // when
        Employee actualEmployee = underTest.getEmployeeModelById(employee.getId());

        //then
        assertThat(actualEmployee).isEqualTo(employee);
    }

    @Test
    void shouldGetEmployeeByIdWhenNoProjectsNoSkillsNoManager() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        Employee employee = employeeForms.employee();
        EmployeeResponse employeeResponse = employeeForms.employeeResponse();
        when(employeeRepository.findById(employee.getId())).thenReturn(Optional.of(employee));
        when(mapper.employeeToEmployeeResponse(employee)).thenReturn(employeeResponse);

        // when
        EmployeeResponse actualEmployee = underTest.getEmployeeById(employee.getId());

        //then
        assertThat(actualEmployee).isEqualTo(employeeResponse);
    }

    @Test
    void shouldThrowExceptionWhenTriedToGetEmployeeThatWasNotFound() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        Employee employee = employeeForms.employee();
        when(employeeRepository.findById(employee.getId())).thenReturn(Optional.empty());

        // when then
        assertThatThrownBy(() -> underTest.getEmployeeById(employee.getId()))
                .isInstanceOf(EmployeeNotFoundException.class)
                .hasMessageContaining(employee.getId().toString());
    }

    @Test
    void shouldGetModelEmployeesWhenThreeEmployees() {
        // given
        List<EmployeeForms> employeeFormsList = List.of(
                mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER),
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_NO_MANAGER),
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER)
        );
        List<Employee> employees = employeeFormsList.stream().map(EmployeeForms::employee).toList();

        when(employeeRepository.findAll()).thenReturn(employees);

        // when
        List<Employee> actualEmployees = underTest.getModelEmployees();

        //then
        assertThat(actualEmployees).isEqualTo(employees);
    }

    @Test
    void shouldGetEmployeesWhenThreeEmployees() {
        // given
        List<EmployeeForms> employeeFormsList = List.of(
                mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER),
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_NO_MANAGER),
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER)
        );
        List<Employee> employees = employeeFormsList.stream().map(EmployeeForms::employee).toList();
        List<EmployeeResponse> employeeResponses = employeeFormsList.stream()
                .map(EmployeeForms::employeeResponse)
                .toList();

        when(employeeRepository.findAll()).thenReturn(employees);
        employeeFormsList.forEach(employeeForms ->
                when(mapper.employeeToEmployeeResponse(employeeForms.employee()))
                        .thenReturn(employeeForms.employeeResponse())
        );

        // when
        List<EmployeeResponse> actualEmployees = underTest.getEmployees();

        //then
        assertThat(actualEmployees).isEqualTo(employeeResponses);
    }

    @Test
    void shouldGetEmployeesByNameWithSurnameContainingWhenTwoMeetCriteria() {
        // given
        List<EmployeeForms> employeeFormsContainingTerm = List.of(
                mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER),
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER)
        );
        List<Employee> employeesContainingTerm = employeeFormsContainingTerm.stream()
                .map(EmployeeForms::employee)
                .toList();
        List<EmployeeResponse> employeeResponsesContainingTerm = employeeFormsContainingTerm.stream()
                .map(EmployeeForms::employeeResponse)
                .toList();
        String term = "r";
        when(employeeRepository.findByNameWithSurnameContainingIgnoreCase(term)).thenReturn(employeesContainingTerm);
        employeeFormsContainingTerm.forEach(employeeForms ->
                when(mapper.employeeToEmployeeResponse(employeeForms.employee()))
                        .thenReturn(employeeForms.employeeResponse())
        );

        // when
        List<EmployeeResponse> actualEmployees = underTest.getEmployeesByNameWithSurnameContaining(term);

        //then
        assertThat(actualEmployees).isEqualTo(employeeResponsesContainingTerm);
    }

    @Test
    void shouldGetManagersWhenTwoManagers() {
        // given
        List<EmployeeForms> employeeFormsList = List.of(
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_NO_MANAGER),
                mockEmployeeForms.get(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER)
        );
        List<Employee> managers = employeeFormsList.stream().map(EmployeeForms::employee).toList();
        List<ManagerDto> employeeResponses = employeeFormsList.stream()
                .map(EmployeeForms::managerDto)
                .toList();

        when(employeeRepository.findAll()).thenReturn(managers);
        employeeFormsList.forEach(employeeForms ->
                when(mapper.employeeToManagerDto(employeeForms.employee()))
                        .thenReturn(employeeForms.managerDto())
        );

        // when
        List<ManagerDto> actualManagers = underTest.getManagers();

        //then
        assertThat(actualManagers).isEqualTo(employeeResponses);
    }

    @Test
    void shouldUpdateEmployeeWhenNoProjectsNoSkillsNoManagerAndChangedNameAndEmploymentDate() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        EmployeeRequest oldEmployeeRequest = employeeForms.employeeRequest();
        Employee oldEmployee = employeeForms.employee();
        EmployeeResponse oldEmployeeResponse = employeeForms.employeeResponse();

        String newName = "John";
        LocalDate newEmploymentDate = LocalDate.of(2019, 4, 19);
        EmployeeRequest newEmployeeRequest = EmployeeRequest.builder()
                .id(oldEmployeeRequest.id())
                .name(newName)
                .surname(oldEmployeeRequest.surname())
                .employmentDate(newEmploymentDate)
                .projectIds(oldEmployeeRequest.projectIds())
                .skillIds(oldEmployeeRequest.skillIds())
                .managerId(oldEmployeeRequest.managerId())
                .build();
        Employee newEmployee = Employee.builder()
                .id(oldEmployee.getId())
                .name(newName)
                .surname(oldEmployee.getSurname())
                .employmentDate(newEmploymentDate)
                .projects(oldEmployee.getProjects())
                .skills(oldEmployee.getSkills())
                .manager(oldEmployee.getManager())
                .build();
        EmployeeResponse newEmployeeResponse = EmployeeResponse.builder()
                .id(oldEmployeeResponse.id())
                .name(newName)
                .surname(oldEmployeeResponse.surname())
                .employmentDate(newEmploymentDate)
                .projects(oldEmployeeResponse.projects())
                .skills(oldEmployeeResponse.skills())
                .manager(oldEmployeeResponse.manager())
                .build();

        when(employeeRepository.findById(oldEmployee.getId())).thenReturn(Optional.of(oldEmployee));
        when(employeeRepository.save(newEmployee)).thenReturn(newEmployee);
        when(mapper.employeeRequestToEmployee(eq(newEmployeeRequest), any(MapperEmployeeServiceContext.class)))
                .thenReturn(newEmployee);
        when(mapper.employeeToEmployeeResponse(newEmployee)).thenReturn(newEmployeeResponse);

        // when
        EmployeeResponse actualEmployee = underTest.updateEmployee(oldEmployee.getId(), newEmployeeRequest);

        //then
        assertThat(actualEmployee).isEqualTo(newEmployeeResponse);
    }

    @Test
    void shouldThrowExceptionWhenTriedToUpdateEmployeeWithDifferentIdsInPathAndBody() {
        // given
        EmployeeForms employeeForms = mockEmployeeForms.get(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER);
        EmployeeRequest employeeRequest = employeeForms.employeeRequest();
        UUID idFromPath = UUID.randomUUID();

        // when then
        assertThatThrownBy(() -> underTest.updateEmployee(idFromPath, employeeRequest))
                .isInstanceOf(DifferentEmployeeIdInPathAndBodyException.class)
                .hasMessageContaining(idFromPath.toString())
                .hasMessageContaining(employeeRequest.id().toString());
    }

    private Employee changeIdInEmployee(UUID newId, Employee employeeToChange) {
        return Employee.builder()
                .id(newId)
                .name(employeeToChange.getName())
                .surname(employeeToChange.getSurname())
                .employmentDate(employeeToChange.getEmploymentDate())
                .projects(employeeToChange.getProjects())
                .skills(employeeToChange.getSkills())
                .manager(employeeToChange.getManager())
                .build();
    }

    private EmployeeRequest changeIdInEmployeeRequest(UUID newId, EmployeeRequest employeeRequest) {
        return EmployeeRequest.builder()
                .id(newId)
                .name(employeeRequest.name())
                .surname(employeeRequest.surname())
                .employmentDate(employeeRequest.employmentDate())
                .projectIds(employeeRequest.projectIds())
                .skillIds(employeeRequest.skillIds())
                .managerId(employeeRequest.managerId())
                .build();
    }

    private EmployeeResponse changeIdInEmployeeResponse(UUID newId, EmployeeResponse employeeResponse) {
        return EmployeeResponse.builder()
                .id(newId)
                .name(employeeResponse.name())
                .surname(employeeResponse.surname())
                .employmentDate(employeeResponse.employmentDate())
                .projects(employeeResponse.projects())
                .skills(employeeResponse.skills())
                .manager(employeeResponse.manager())
                .build();
    }

    private enum MockProjectType {
        DATA_TRACKR,
        FINTECH_CONNECT,
        SMART_HOME_X
    }

    private enum MockSkillType {
        ANGULAR,
        JAVASCRIPT,
        PYTHON
    }

    private enum MockEmployeeType {
        NO_PROJECTS_NO_SKILLS_NO_MANAGER,
        ONE_PROJECT_ONE_SKILL_NO_MANAGER,
        ONE_PROJECT_ONE_SKILL_WITH_MANAGER
    }

    private record ProjectForms(
            Project project,
            ProjectDto projectDto
    ) {
    }

    private record SkillForms(
            Skill skill,
            SkillDto skillDto
    ) {
    }

    private record EmployeeForms(
            Employee employee,
            EmployeeRequest employeeRequest,
            EmployeeResponse employeeResponse,
            ManagerDto managerDto
    ) {
    }

    private void generateProjects() {
        Arrays.stream(MockProjectType.values()).forEach(this::generateProject);
    }

    private void generateProject(MockProjectType mockProjectType) {
        switch (mockProjectType) {
            case DATA_TRACKR -> {
                Project project = new Project(UUID.randomUUID(), "DataTrackr");
                ProjectDto projectDto = new ProjectDto(project.getId(), project.getName());
                mockProjectForms.put(MockProjectType.DATA_TRACKR, new ProjectForms(project, projectDto));
            }
            case FINTECH_CONNECT -> {
                Project project = new Project(UUID.randomUUID(), "FinTech Connect");
                ProjectDto projectDto = new ProjectDto(project.getId(), project.getName());
                mockProjectForms.put(MockProjectType.FINTECH_CONNECT, new ProjectForms(project, projectDto));
            }
            case SMART_HOME_X -> {
                Project project = new Project(UUID.randomUUID(), "SmartHomeX");
                ProjectDto projectDto = new ProjectDto(project.getId(), project.getName());
                mockProjectForms.put(MockProjectType.SMART_HOME_X, new ProjectForms(project, projectDto));
            }
        }
    }

    private void generateSkills() {
        Arrays.stream(MockSkillType.values()).forEach(this::generateSkill);
    }

    private void generateSkill(MockSkillType mockSkillType) {
        switch (mockSkillType) {
            case ANGULAR -> {
                Skill skill = new Skill(UUID.randomUUID(), "DataTrackr");
                SkillDto skillDto = new SkillDto(skill.getId(), skill.getName());
                mockSkillForms.put(MockSkillType.ANGULAR, new SkillForms(skill, skillDto));
            }
            case JAVASCRIPT -> {
                Skill skill = new Skill(UUID.randomUUID(), "FinTech Connect");
                SkillDto skillDto = new SkillDto(skill.getId(), skill.getName());
                mockSkillForms.put(MockSkillType.JAVASCRIPT, new SkillForms(skill, skillDto));
            }
            case PYTHON -> {
                Skill skill = new Skill(UUID.randomUUID(), "SmartHomeX");
                SkillDto skillDto = new SkillDto(skill.getId(), skill.getName());
                mockSkillForms.put(MockSkillType.PYTHON, new SkillForms(skill, skillDto));
            }
        }
    }

    private void generateEmployees() {
        Arrays.stream(MockEmployeeType.values()).forEach(this::generateEmployee);
    }

    private void generateEmployee(MockEmployeeType mockEmployeeType) {
        switch (mockEmployeeType) {
            case NO_PROJECTS_NO_SKILLS_NO_MANAGER -> {
                UUID id = UUID.randomUUID();
                EmployeeForms employeeForms = new EmployeeForms(
                        Employee.builder()
                                .id(id)
                                .name("Andreas")
                                .surname("Peterson")
                                .employmentDate(LocalDate.now())
                                .projects(Set.of())
                                .skills(Set.of())
                                .manager(null)
                                .build(),
                        EmployeeRequest.builder()
                                .id(id)
                                .name("Andreas")
                                .surname("Peterson")
                                .employmentDate(LocalDate.now())
                                .projectIds(List.of())
                                .skillIds(List.of())
                                .build(),
                        EmployeeResponse.builder()
                                .id(id)
                                .name("Andreas")
                                .surname("Peterson")
                                .employmentDate(LocalDate.now())
                                .projects(Set.of())
                                .skills(Set.of())
                                .manager(Optional.empty())
                                .build(),
                        ManagerDto.builder()
                                .id(id)
                                .name("Andreas")
                                .surname("Peterson")
                                .build()
                );
                mockEmployeeForms.put(MockEmployeeType.NO_PROJECTS_NO_SKILLS_NO_MANAGER, employeeForms);
            }
            case ONE_PROJECT_ONE_SKILL_NO_MANAGER -> {
                UUID id = UUID.randomUUID();
                ProjectForms projectForms = mockProjectForms.get(MockProjectType.DATA_TRACKR);
                SkillForms skillForms = mockSkillForms.get(MockSkillType.ANGULAR);
                EmployeeForms employeeForms = new EmployeeForms(
                        Employee.builder()
                                .id(id)
                                .name("Genevieve")
                                .surname("Diaz")
                                .employmentDate(LocalDate.now())
                                .projects(Set.of(projectForms.project))
                                .skills(Set.of(skillForms.skill))
                                .manager(null)
                                .build(),
                        EmployeeRequest.builder()
                                .id(id)
                                .name("Genevieve")
                                .surname("Diaz")
                                .employmentDate(LocalDate.now())
                                .projectIds(List.of(projectForms.project.getId()))
                                .skillIds(List.of(projectForms.project.getId()))
                                .build(),
                        EmployeeResponse.builder()
                                .id(id)
                                .name("Genevieve")
                                .surname("Diaz")
                                .employmentDate(LocalDate.now())
                                .projects(Set.of(projectForms.project))
                                .skills(Set.of(skillForms.skill))
                                .manager(Optional.empty())
                                .build(),
                        ManagerDto.builder()
                                .id(id)
                                .name("Genevieve")
                                .surname("Diaz")
                                .build()
                );
                mockEmployeeForms.put(MockEmployeeType.ONE_PROJECT_ONE_SKILL_NO_MANAGER, employeeForms);
            }
            case ONE_PROJECT_ONE_SKILL_WITH_MANAGER -> {
                UUID id = UUID.randomUUID();
                UUID managerId = UUID.randomUUID();
                ProjectForms projectForms = mockProjectForms.get(MockProjectType.FINTECH_CONNECT);
                SkillForms skillForms = mockSkillForms.get(MockSkillType.JAVASCRIPT);
                Employee manager = Employee.builder()
                        .id(managerId)
                        .name("Susan")
                        .employmentDate(LocalDate.of(2020, 3, 20))
                        .surname("Hampton")
                        .projects(Set.of())
                        .skills(Set.of())
                        .manager(null)
                        .build();
                ManagerDto managerDto = new ManagerDto(
                        managerId,
                        "Susan",
                        "Hampton"
                );
                EmployeeForms employeeForms = new EmployeeForms(
                        Employee.builder()
                                .id(id)
                                .name("Dora")
                                .surname("Smith")
                                .employmentDate(LocalDate.now())
                                .projects(Set.of(projectForms.project))
                                .skills(Set.of(skillForms.skill))
                                .manager(manager)
                                .build(),
                        EmployeeRequest.builder()
                                .id(id)
                                .name("Dora")
                                .surname("Smith")
                                .employmentDate(LocalDate.now())
                                .projectIds(List.of(projectForms.project.getId()))
                                .skillIds(List.of(skillForms.skill.getId()))
                                .managerId(Optional.of(managerId))
                                .build(),
                        EmployeeResponse.builder()
                                .id(id)
                                .name("Dora")
                                .surname("Smith")
                                .employmentDate(LocalDate.now())
                                .projects(Set.of(projectForms.project))
                                .skills(Set.of(skillForms.skill))
                                .manager(Optional.of(managerDto))
                                .build(),
                        ManagerDto.builder()
                                .id(id)
                                .name("Dora")
                                .surname("Smith")
                                .build()
                );
                mockEmployeeForms.put(MockEmployeeType.ONE_PROJECT_ONE_SKILL_WITH_MANAGER, employeeForms);
            }
        }
    }


}
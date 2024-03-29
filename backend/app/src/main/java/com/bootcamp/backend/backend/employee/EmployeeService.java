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
import com.bootcamp.backend.backend.project.ProjectService;
import com.bootcamp.backend.backend.skill.SkillService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final MapStructMapper mapStructMapper;
    private final MapperEmployeeServiceContext mapperEmployeeServiceContext;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            MapStructMapper mapStructMapper,
            ProjectService projectService,
            SkillService skillService
    ) {
        this.employeeRepository = employeeRepository;
        this.mapStructMapper = mapStructMapper;
        this.mapperEmployeeServiceContext = new MapperEmployeeServiceContext(
                this, projectService, skillService
        );
    }

    public EmployeeResponse addEmployee(EmployeeRequest employeeRequest) {
        Employee employee = mapStructMapper.employeeRequestToEmployee(employeeRequest, mapperEmployeeServiceContext);
        throwExceptionIfEmployeeAlreadyExists(employee);
        checkIfManagerIsValid(employee.getManager());
        Employee savedEmployee = employeeRepository.save(employee);

        return mapStructMapper.employeeToEmployeeResponse(savedEmployee);
    }

    public void deleteEmployeeById(UUID id) {
        employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
        employeeRepository.deleteSafelyById(id);
    }

    public EmployeeResponse getEmployeeById(UUID id) {
        Employee foundEmployee = getEmployeeModelById(id);
        return mapStructMapper.employeeToEmployeeResponse(foundEmployee);
    }

    public Employee getEmployeeModelById(UUID id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    public List<Employee> getModelEmployees() {
        return employeeRepository.findAll();
    }

    public List<EmployeeResponse> getEmployees() {
        return getModelEmployees()
                .stream()
                .map(mapStructMapper::employeeToEmployeeResponse)
                .toList();
    }

    public List<EmployeeResponse> getEmployeesByNameWithSurnameContaining(String term) {
        List<Employee> employeeList = employeeRepository.findByNameWithSurnameContainingIgnoreCase(term);

        return employeeList.stream()
                .map(mapStructMapper::employeeToEmployeeResponse)
                .toList();
    }

    public List<ManagerDto> getManagers() {
        return getModelEmployees().stream().map(mapStructMapper::employeeToManagerDto).toList();
    }

    public EmployeeResponse updateEmployee(UUID idFromPath, EmployeeRequest employeeRequest) {
        checkIfIdsFromPathAndBodyMatch(idFromPath, employeeRequest.id());
        Employee employeeWithUpdates = mapStructMapper
                .employeeRequestToEmployee(employeeRequest, mapperEmployeeServiceContext);
        Employee oldEmployee = employeeRepository.findById(employeeRequest.id())
                .orElseThrow(() -> new EmployeeNotFoundException(employeeRequest.id()));
        checkIfManagerIsValid(employeeWithUpdates.getManager());

        employeeWithUpdates.setUsername(oldEmployee.getUsername());
        employeeWithUpdates.setPassword(oldEmployee.getPassword());
        employeeWithUpdates.setRole(oldEmployee.getRole());

        Employee updatedEmployee = employeeRepository.save(employeeWithUpdates);

        return mapStructMapper.employeeToEmployeeResponse(updatedEmployee);
    }

    private void checkIfIdsFromPathAndBodyMatch(UUID idFromPath, UUID idFromBody) {
        if (!idFromBody.equals(idFromPath)) {
            throw new DifferentEmployeeIdInPathAndBodyException(idFromPath, idFromBody);
        }
    }

    private void checkIfManagerIsValid(Employee manager) {
        if (manager != null && !employeeRepository.existsById(manager.getId())) {
            throw new ManagerWasNotFoundException(manager.getId());
        }
    }

    private void throwExceptionIfEmployeeAlreadyExists(Employee employee) {
        if (employee.getId() != null && employeeRepository.existsById(employee.getId())) {
            throw new EmployeeAlreadyExistsException(employee.getId());
        }
    }

    private void throwExceptionIfEmployeeNotFound(Employee employee) {
        if (!employeeRepository.existsById(employee.getId())) {
            throw new EmployeeNotFoundException(employee.getId());
        }
    }
}

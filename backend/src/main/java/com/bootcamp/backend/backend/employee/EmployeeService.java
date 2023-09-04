package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.auth.AuthResponse;
import com.bootcamp.backend.backend.auth.AuthenticationRequest;
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
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final MapStructMapper mapStructMapper;
    private final MapperEmployeeServiceContext mapperEmployeeServiceContext;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            MapStructMapper mapStructMapper,
            ProjectService projectService,
            SkillService skillService,
            PasswordEncoder passwordEncoder
    ) {
        this.employeeRepository = employeeRepository;
        this.mapStructMapper = mapStructMapper;
        this.mapperEmployeeServiceContext = new MapperEmployeeServiceContext(
                this, projectService, skillService
        );
        this.passwordEncoder = passwordEncoder;
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
        employeeRepository.deleteById(id);
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

    public List<EmployeeResponse> getEmployeesByNameOrSurnameContaining(String term) {
        List<Employee> employeeList = employeeRepository.findByNameOrSurnameContainingIgnoreCase(term);

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
        throwExceptionIfEmployeeNotFound(employeeWithUpdates);
        checkIfManagerIsValid(employeeWithUpdates.getManager());
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

    public AuthResponse login(AuthenticationRequest authenticationRequest) {
        Optional<Employee> response = this.employeeRepository.findUserByUsername(
                authenticationRequest.username()
        );
        if (response.isPresent() && passwordEncoder.matches(authenticationRequest.password(), response.get().getPassword())) {
            return new AuthResponse(authenticationRequest.username());
        }

        throw new ResponseStatusException(HttpStatusCode.valueOf(401));
    }
}

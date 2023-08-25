package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.employee.dtos.EmployeeRequest;
import com.bootcamp.backend.backend.employee.dtos.EmployeeResponse;
import com.bootcamp.backend.backend.employee.exception.DifferentEmployeeIdInDatabaseException;
import com.bootcamp.backend.backend.employee.exception.EmployeeAlreadyExistsException;
import com.bootcamp.backend.backend.employee.exception.EmployeeNotFoundException;
import com.bootcamp.backend.backend.employee.exception.ManagerDoesntExistException;
import com.bootcamp.backend.backend.mappers.MapStructMapper;
import com.bootcamp.backend.backend.mappers.MapperEmployeeServiceContext;
import com.bootcamp.backend.backend.project.ProjectService;
import com.bootcamp.backend.backend.skill.SkillService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
        if (doesEmployeeExist(employee)) {
            throw new EmployeeAlreadyExistsException();
        }
        if (!isManagerValid(employee.getManager())) {
            throw new ManagerDoesntExistException();
        }
        Employee savedEmployee = employeeRepository.save(employee);

        return mapStructMapper.employeeToEmployeeResponse(savedEmployee);
    }

    public void deleteEmployeeById(UUID id) {
        Optional<Employee> foundEmployee = employeeRepository.findById(id);
        if (foundEmployee.isEmpty()) {
            throw new EmployeeNotFoundException();
        }
        employeeRepository.deleteById(id);
    }

    public EmployeeResponse getEmployeeById(UUID id) {
        return mapStructMapper.employeeToEmployeeResponse(getEmployeeModelById(id));
    }

    public Employee getEmployeeModelById(UUID id) {
        Optional<Employee> foundEmployee = employeeRepository.findById(id);
        if (foundEmployee.isEmpty()) {
            throw new EmployeeNotFoundException();
        }

        return foundEmployee.get();
    }

    public List<EmployeeResponse> getEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(e -> mapStructMapper.employeeToEmployeeResponse(e))
                .toList();
    }

    public List<EmployeeResponse> getEmployeesByNameOrSurnameContaining(String term) {
        List<Employee> employeeList = employeeRepository.findByNameOrSurnameContainingIgnoreCase(term);
        if (employeeList.isEmpty()) {
            throw new EmployeeNotFoundException();
        }

        return employeeList.stream()
                .map(e -> mapStructMapper.employeeToEmployeeResponse(e))
                .toList();
    }

    public EmployeeResponse updateEmployee(UUID idFromPath, EmployeeRequest employeeRequest) {
        if (areIdsNotEqual(idFromPath, employeeRequest.id())) {
            throw new DifferentEmployeeIdInDatabaseException();
        }
        if (!employeeRepository.existsById(employeeRequest.id())) {
            throw new EmployeeNotFoundException();
        }
        Employee employeeToUpdate = mapStructMapper.employeeRequestToEmployee(employeeRequest, mapperEmployeeServiceContext);
        Employee updatedEmployee = employeeRepository.save(employeeToUpdate);

        return mapStructMapper.employeeToEmployeeResponse(updatedEmployee);
    }

    private boolean doesEmployeeExist(Employee employee) {
        return employee.getId() != null && employeeRepository.existsById(employee.getId());
    }

    private boolean isManagerValid(Employee manager) {
        return manager == null || employeeRepository.existsById(manager.getId());
    }

    private boolean areIdsNotEqual(UUID idFromPath, UUID idFromBody) {
        return !idFromBody.equals(idFromPath);
    }
}

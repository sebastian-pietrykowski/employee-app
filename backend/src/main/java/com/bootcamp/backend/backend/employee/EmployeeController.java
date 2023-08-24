package com.bootcamp.backend.backend.employee;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping(path = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employee> addEmployee(
            @RequestBody @Valid Employee employeeToAdd
    ) {
        try {
            Employee addedEmployee = employeeService.addEmployee(employeeToAdd);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedEmployee);
        } catch (EmployeeAlreadyExistsException e) {
            // TODO Have to wait for ControllerAdvice in order to return ResponseEntity<ApiError>
            // ApiError apiError = new ApiError(HttpStatus.CONFLICT, "Employee already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Employee> deleteEmployeeById(
            @PathVariable("id") String id
    ) {
        try {
            employeeService.deleteEmployeeById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable("id") String id
    ) {
        try {
            Employee employee = employeeService.getEmployeeById(id);
            return ResponseEntity.status(HttpStatus.OK).body(employee);

        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("")
    public ResponseEntity<List<Employee>> getEmployees(
            @RequestParam(value = "term", required = false) String term
    ) {
        List<Employee> employees;
        if (term == null) {
            employees = employeeService.getEmployees();
        } else {
            try {
                employees = employeeService.getEmployeesByNameOrSurnameStartingWith(term);
            } catch (EmployeeNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable("id") String id,
            @RequestBody @Valid Employee employeeToUpdate
    ) {
        try {
            Employee updatedEmployee = employeeService.updateEmployee(id, employeeToUpdate);
            return ResponseEntity.status(HttpStatus.OK).body(updatedEmployee);
        } catch (DifferentEmployeeIdInDatabaseException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.employee.dtos.EmployeeRequest;
import com.bootcamp.backend.backend.employee.dtos.EmployeeResponse;
import com.bootcamp.backend.backend.employee.exception.DifferentEmployeeIdInDatabaseException;
import com.bootcamp.backend.backend.employee.exception.EmployeeAlreadyExistsException;
import com.bootcamp.backend.backend.employee.exception.EmployeeNotFoundException;
import com.bootcamp.backend.backend.employee.exception.ManagerDoesntExistException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "employees")
@CrossOrigin()
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> addEmployee(
            @RequestBody @Valid EmployeeRequest employeeToAdd
    ) {
        try {
            EmployeeResponse addedEmployee = employeeService.addEmployee(employeeToAdd);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedEmployee);
        } catch (EmployeeAlreadyExistsException e) {
            // TODO Have to wait for ControllerAdvice in order to return ResponseEntity<ApiError>
            // ApiError apiError = new ApiError(HttpStatus.CONFLICT, "Employee already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        catch (ManagerDoesntExistException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteEmployeeById(
            @PathVariable("id") UUID id
    ) {
        try {
            employeeService.deleteEmployeeById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(
            @PathVariable("id") UUID id
    ) {
        try {
            EmployeeResponse employee = employeeService.getEmployeeById(id);
            return ResponseEntity.status(HttpStatus.OK).body(employee);

        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getEmployees(
            @RequestParam(value = "term", required = false) String term
    ) {
        List<EmployeeResponse> employees;
        if (term == null) {
            employees = employeeService.getEmployees();
        } else {
            try {
                employees = employeeService.getEmployeesByNameOrSurnameContaining(term);
            } catch (EmployeeNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable("id") UUID id,
            @RequestBody @Valid EmployeeRequest employeeToUpdate
    ) {
        try {
            EmployeeResponse updatedEmployee = employeeService.updateEmployee(id, employeeToUpdate);
            return ResponseEntity.status(HttpStatus.OK).body(updatedEmployee);
        } catch (DifferentEmployeeIdInDatabaseException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

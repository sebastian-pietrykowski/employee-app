package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.employee.dtos.EmployeeRequest;
import com.bootcamp.backend.backend.employee.dtos.EmployeeResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "employees")
@CrossOrigin()
@AllArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeResponse> addEmployee(
            @RequestBody @Valid EmployeeRequest employeeToAdd
    ) {
        EmployeeResponse addedEmployee = employeeService.addEmployee(employeeToAdd);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployeeById(
            @PathVariable("id") UUID id
    ) {
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(
            @PathVariable("id") UUID id
    ) {
        EmployeeResponse employee = employeeService.getEmployeeById(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);

    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getEmployees(
            @RequestParam(value = "term", required = false) String term
    ) {
        List<EmployeeResponse> employees;
        if (term == null) {
            employees = employeeService.getEmployees();
        } else {
            employees = employeeService.getEmployeesByNameOrSurnameContaining(term);
        }
        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable("id") UUID id,
            @RequestBody @Valid EmployeeRequest employeeToUpdate
    ) {
        EmployeeResponse updatedEmployee = employeeService.updateEmployee(id, employeeToUpdate);
        return ResponseEntity.status(HttpStatus.OK).body(updatedEmployee);
    }
}

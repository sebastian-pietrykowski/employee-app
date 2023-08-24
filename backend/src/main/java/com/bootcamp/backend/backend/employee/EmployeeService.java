package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.employee.exception.DifferentEmployeeIdInDatabaseException;
import com.bootcamp.backend.backend.employee.exception.EmployeeAlreadyExistsException;
import com.bootcamp.backend.backend.employee.exception.EmployeeNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee) {
        if (employee.getId() != null && employeeRepository.existsById(employee.getId())) {
            throw new EmployeeAlreadyExistsException();
        }

        return employeeRepository.save(employee);
    }

    public void deleteEmployeeById(String id) {
        Optional<Employee> foundEmployee = employeeRepository.findById(id);
        if (foundEmployee.isEmpty()) {
            throw new EmployeeNotFoundException();
        }
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(String id) {
        Optional<Employee> foundEmployee = employeeRepository.findById(id);
        if (foundEmployee.isEmpty()) {
            throw new EmployeeNotFoundException();
        }

        return foundEmployee.get();
    }

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public List<Employee> getEmployeesByNameOrSurnameContaining(String term) {
        List<Employee> employeeList = employeeRepository.findByNameOrSurnameContainingIgnoreCase(term);
        if (employeeList.isEmpty()) {
            throw new EmployeeNotFoundException();
        }

        return employeeList;
    }

    public Employee updateEmployee(String idFromPath, Employee employee) {
        if (areIdsNotEqual(idFromPath, employee.getId())) {
            throw new DifferentEmployeeIdInDatabaseException();
        }
        if (!employeeRepository.existsById(employee.getId())) {
            throw new EmployeeNotFoundException();
        }

        return employeeRepository.save(employee);
    }

    private boolean areIdsNotEqual(String idFromPath, String idFromBody) {
        return !idFromBody.equals(idFromPath);
    }
}

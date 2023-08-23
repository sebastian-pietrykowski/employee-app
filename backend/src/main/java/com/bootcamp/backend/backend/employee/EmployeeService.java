package com.bootcamp.backend.backend.employee;

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

    public List<Employee> getEmployeesByNameOrSurnameStartingWith(String term) {
        List<Employee> employeeList = employeeRepository.findByNameOrSurnameStartingWithIgnoreCase(term);
        if (employeeList.isEmpty()) {
            throw new EmployeeNotFoundException();
        }

        return employeeList;
    }

    public Employee updateEmployee(String idFromPath, Employee employee) {
        if (!employee.getId().equals(idFromPath)) {
            throw new DifferentEmployeeIdInDatabaseException();
        }
        if (!employeeRepository.existsById(employee.getId())) {
            throw new EmployeeNotFoundException();
        }

        return employeeRepository.save(employee);
    }
}

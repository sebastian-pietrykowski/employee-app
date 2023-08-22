package com.bootcamp.backend.backend.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    @Query("select e from employee e where " +
            "lower(e.name) like ':term' " +
            "or lower(e.surname) like ':term' " +
            "or (lower(concat(e.name, ' ', e.surname)) like '%:term')")
    List<Employee> findByNameOrSurnameContainingIgnoreCase(String term);
}

package com.bootcamp.backend.backend.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    @Query("select e from employee e where " +
            "(lower(concat(e.name, ' ', e.surname)) like lower(concat('%',:term,'%')))")
    List<Employee> findByNameWithSurnameContainingIgnoreCase(String term);
}

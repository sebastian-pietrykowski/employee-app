package com.bootcamp.backend.backend.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    @Query("select e from employee e where " +
            "lower(e.name) like lower(concat('%',:term,'%')) " +
            "or lower(e.surname) like lower(concat('%',:term,'%')) " +
            "or (lower(concat(e.name, ' ', e.surname)) like lower(concat('%',:term,'%')))")
    List<Employee> findByNameOrSurnameContainingIgnoreCase(String term);

    Optional<Employee> findUserByUsername(String username);

    default void deleteSafelyById(UUID id) {
        Employee foundEmployee = this.getById(id);
        foundEmployee.getSubordinates().forEach((Employee subordinate) -> {
            subordinate.setManager(null);
        });
        deleteById(id);
    }
}

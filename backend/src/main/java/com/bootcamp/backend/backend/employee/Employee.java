package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.*;

@Entity(name = "employee")
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Employee implements Comparable<Employee> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    @NotBlank(message = "Property 'name' is not defined")
    private String name;

    @Column(name = "surname")
    @NotBlank(message = "Property 'surname' is not defined")
    private String surname;

    @Column(name = "employment_date")
    @NotNull(message = "Property 'employmentDate' is not defined")
    @DateTimeFormat
    private LocalDate employmentDate;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @Builder.Default
    private Set<Project> projects = new TreeSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @Builder.Default
    private Set<Skill> skills = new TreeSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @Override
    public int compareTo(@NonNull Employee otherEmployee) {
        return Comparator
                .comparing(Employee::getSurname)
                .thenComparing(Employee::getName)
                .thenComparing(Employee::getId)
                .compare(this, otherEmployee);
    }
}

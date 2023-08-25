package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.*;

@Entity(name = "employee")
@Table(name = "employee")
@NoArgsConstructor
@Getter
@Setter
public class Employee implements Comparable<Employee> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    @NotEmpty
    private String name;

    @Column(name = "surname")
    @NotEmpty
    private String surname;

    @Column(name = "employment_date")
    @NotNull
    @DateTimeFormat
    private Date employmentDate;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Project> projects = new TreeSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Skill> skills = new TreeSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "manager_id")
    private Employee manager;


    @Override
    public int compareTo(Employee otherEmployee) {
        return Comparator
                .comparing(Employee::getSurname)
                .thenComparing(Employee::getName)
                .thenComparing(Employee::getId)
                .compare(this, otherEmployee);
    }
}

package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Comparator;
import java.util.Date;
import java.util.Set;
import java.util.TreeSet;


@Entity(name = "employee")
@Table(name = "employee")
@NoArgsConstructor
@Getter
@Setter
public class Employee implements Comparable<Employee> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    @NotEmpty
    private String name;

    @Column(name = "surname")
    @NotEmpty
    private String surname;

    @Column(name = "employment_date")
    @NotNull
    private Date employmentDate;

    @ManyToMany
    private Set<Project> listOfProjects = new TreeSet<>();

    @ManyToMany
    private Set<Skill> listOfSkills = new TreeSet<>();

    /*
    // TODO Have to wait with this until mapping from DTO is implemented in order not to have to pass a whole manager object in JSON
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private Set<Employee> subordinates = new TreeSet<>();
     */

    @Override
    public int compareTo(Employee otherEmployee) {
        return Comparator
                .comparing(Employee::getSurname)
                .thenComparing(Employee::getName)
                .compare(this, otherEmployee);
    }
}

package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

@Entity(name = "employee")
@NoArgsConstructor
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "employment_date")
    private Date employmentDate;

    @ManyToMany
    private Set<Project> listOfProjects = new TreeSet<>();

    @ManyToMany
    private Set<Skill> listOfSkills = new TreeSet<>();

    @Column(name = "managerId")
    private String managerId;
}

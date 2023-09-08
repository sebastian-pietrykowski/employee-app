package com.bootcamp.backend.backend.employee;

import com.bootcamp.backend.backend.project.Project;
import com.bootcamp.backend.backend.skill.Skill;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;

@Entity(name = "employee")
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Employee implements Comparable<Employee>, UserDetails {
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
    private Set<Project> projects = new TreeSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Skill> skills = new TreeSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @OneToMany(mappedBy = "manager")
    private Set<Employee> subordinates = new TreeSet<>();

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
    @Override
    public int compareTo(Employee otherEmployee) {
        return Comparator
                .comparing(Employee::getSurname)
                .thenComparing(Employee::getName)
                .thenComparing(Employee::getId)
                .compare(this, otherEmployee);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

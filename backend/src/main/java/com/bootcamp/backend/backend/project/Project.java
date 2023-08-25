package com.bootcamp.backend.backend.project;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "project")
@Table(name = "project")
@NoArgsConstructor
@Getter
@Setter
public class Project implements Comparable<Project> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @NotEmpty
    private String name;

    @Override
    public int compareTo(Project thatProject) {
        return this.name.compareTo(thatProject.name);
    }
}

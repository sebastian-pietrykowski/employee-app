package com.bootcamp.backend.backend.project;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "project")
@Table(name = "project")
@NoArgsConstructor
@Getter
@Setter
public class Project implements Comparable<Project> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    @NotBlank(message = "Property 'name' is not defined")
    private String name;

    @Override
    public int compareTo(Project thatProject) {
        return this.name.compareTo(thatProject.name);
    }
}

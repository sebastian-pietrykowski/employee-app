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

// TODO Have to wait with this until mapping from DTO is implemented in order not to have to pass a whole object in JSON
/*
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Project> members = new TreeSet<>();
 */

    @Override
    public int compareTo(Project thatProject) {
        return this.name.compareTo(thatProject.name);
    }
}

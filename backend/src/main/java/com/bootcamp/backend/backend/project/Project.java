package com.bootcamp.backend.backend.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.TreeSet;

@Entity(name = "project")
@NoArgsConstructor
@Getter
@Setter
public class Project implements Comparable<Project>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "project_members",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id"))
    private Set<Project> members = new TreeSet<>();

    @Override
    public int compareTo(Project thatProject) {
        return this.name.compareTo(thatProject.name);
    }
}

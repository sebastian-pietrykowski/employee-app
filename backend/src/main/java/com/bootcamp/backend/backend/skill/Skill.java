package com.bootcamp.backend.backend.skill;

import com.bootcamp.backend.backend.project.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.TreeSet;

@Entity(name = "skill")
@NoArgsConstructor
@Getter
@Setter
public class Skill implements Comparable<Skill> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "skill_holders",
            joinColumns = @JoinColumn(name = "skill_id"),
            inverseJoinColumns = @JoinColumn(name = "holder_id"))
    private Set<Project> holders = new TreeSet<>();

    @Override
    public int compareTo(Skill thatSkill) {
        return this.name.compareTo(thatSkill.name);
    }
}

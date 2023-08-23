package com.bootcamp.backend.backend.skill;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "skill")
@Table(name = "skill")
@NoArgsConstructor
@Getter
@Setter
public class Skill implements Comparable<Skill> {
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
    private Set<Project> holders = new TreeSet<>();

 */

    @Override
    public int compareTo(Skill thatSkill) {
        return this.name.compareTo(thatSkill.name);
    }
}

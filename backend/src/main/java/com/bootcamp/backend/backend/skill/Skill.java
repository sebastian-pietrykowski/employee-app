package com.bootcamp.backend.backend.skill;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity(name = "skill")
@Table(name = "skill")
@NoArgsConstructor
@Getter
@Setter
public class Skill implements Comparable<Skill> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    @NotEmpty
    private String name;

    @Override
    public int compareTo(Skill thatSkill) {
        return this.name.compareTo(thatSkill.name);
    }
}

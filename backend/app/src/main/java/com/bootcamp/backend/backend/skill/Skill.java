package com.bootcamp.backend.backend.skill;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Entity(name = "skill")
@Table(name = "skill")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Skill implements Comparable<Skill> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    @NotBlank(message = "Property 'name' is not defined")
    private String name;

    @Override
    public int compareTo(Skill thatSkill) {
        return this.name.compareTo(thatSkill.name);
    }
}

package com.bootcamp.backend.backend.project;

import com.bootcamp.backend.backend.project.exception.ProjectAlreadyExistsException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "projects", consumes = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin()
@AllArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDto> addProject(
            @RequestBody @Valid ProjectDto project
    ) {
        ProjectDto addedProject = projectService.addProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedProject);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getProjects() {
        List<ProjectDto> projects = projectService.getProjects();
        return ResponseEntity.status(HttpStatus.OK).body(projects);
    }
}

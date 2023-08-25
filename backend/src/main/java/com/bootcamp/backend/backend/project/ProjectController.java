package com.bootcamp.backend.backend.project;

import com.bootcamp.backend.backend.project.exception.ProjectAlreadyExistsException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "projects", consumes = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ProjectDto> addProject(
            @RequestBody @Valid ProjectDto project
    ) {
        try {
            ProjectDto addedProject = projectService.addProject(project);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedProject);
        } catch (ProjectAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getProjects() {
        List<ProjectDto> projects = projectService.getProjects();
        return ResponseEntity.status(HttpStatus.OK).body(projects);
    }
}

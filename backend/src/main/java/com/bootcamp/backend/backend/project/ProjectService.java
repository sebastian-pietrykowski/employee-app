package com.bootcamp.backend.backend.project;

import com.bootcamp.backend.backend.employee.EmployeeAlreadyExistsException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project addProject(Project project) {
        if (project.getId() != null && projectRepository.existsById(project.getId())) {
            throw new EmployeeAlreadyExistsException();
        }

        return projectRepository.save(project);
    }

    public void deleteProjectById(Long id) {
        Optional<Project> foundProject = projectRepository.findById(id);
        if (foundProject.isEmpty()) {
            throw new ProjectNotFoundException();
        }
        projectRepository.deleteById(id);
    }

    public Optional<Project> getProjectById(Long id) {
        Optional<Project> foundProject = projectRepository.findById(id);
        if (foundProject.isEmpty()) {
            throw new ProjectNotFoundException();
        }

        return projectRepository.findById(id);
    }

    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByNameContaining(String term) {
        return projectRepository.findByNameContainingIgnoreCase(term);
    }

    public Project updateProject(Long idFromPath, Project project) {
        if (!project.getId().equals(idFromPath)) {
            throw new DifferentProjectIdInDatabaseException();
        }
        if (!projectRepository.existsById(project.getId())) {
            throw new ProjectNotFoundException();
        }

        return projectRepository.save(project);
    }
}

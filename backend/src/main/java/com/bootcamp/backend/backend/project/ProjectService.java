package com.bootcamp.backend.backend.project;

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
        return projectRepository.save(project);
    }

    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByNameContaining(String term) {
        return projectRepository.findByNameContainingIgnoreCase(term);
    }

    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }
}

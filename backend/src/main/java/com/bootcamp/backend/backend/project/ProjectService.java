package com.bootcamp.backend.backend.project;

import com.bootcamp.backend.backend.employee.exception.EmployeeAlreadyExistsException;
import com.bootcamp.backend.backend.mappers.MapStructMapper;
import com.bootcamp.backend.backend.project.exception.DifferentProjectIdInDatabaseException;
import com.bootcamp.backend.backend.project.exception.ProjectNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProjectService {
    private final MapStructMapper mapStructMapper;
    private final ProjectRepository projectRepository;

    public ProjectDto addProject(ProjectDto projectDto) {
        Project project = mapStructMapper.projectDtoToProject(projectDto);
        if (doesProjectExist(project)) {
            throw new EmployeeAlreadyExistsException();
        }

        Project savedProject = projectRepository.save(project);

        return mapStructMapper.projectToProjectDto(savedProject);
    }

    public void deleteProjectById(UUID id) {
        Optional<Project> foundProject = projectRepository.findById(id);
        if (foundProject.isEmpty()) {
            throw new ProjectNotFoundException();
        }
        projectRepository.deleteById(id);
    }

    public Optional<ProjectDto> getProjectById(UUID id) {
        return getProjectModelById(id).map(mapStructMapper::projectToProjectDto);
    }

    public Optional<Project> getProjectModelById(UUID id) {
        Optional<Project> foundProject = projectRepository.findById(id);
        if (foundProject.isEmpty()) {
            throw new ProjectNotFoundException();
        }

        return Optional.ofNullable(foundProject.get());
    }

    public List<ProjectDto> getProjects() {
        List<Project> foundProjects = projectRepository.findAll();
        return foundProjects.stream().map(mapStructMapper::projectToProjectDto).toList();
    }

    public List<ProjectDto> getProjectsByNameContaining(String term) {
        List<Project> foundProjects = projectRepository.findByNameContainingIgnoreCase(term);
        return foundProjects.stream().map(mapStructMapper::projectToProjectDto).toList();
    }

    public ProjectDto updateProject(UUID idFromPath, ProjectDto projectDto) {
        Project project = mapStructMapper.projectDtoToProject(projectDto);
        if (areIdsNotEqual(idFromPath, project.getId())) {
            throw new DifferentProjectIdInDatabaseException();
        }
        if (!projectRepository.existsById(project.getId())) {
            throw new ProjectNotFoundException();
        }

        Project savedProject = projectRepository.save(project);

        return mapStructMapper.projectToProjectDto(savedProject);
    }

    private boolean doesProjectExist(Project project) {
        return project.getId() != null && projectRepository.existsById(project.getId());
    }

    private boolean areIdsNotEqual(UUID idFromPath, UUID idFromBody) {
        return !idFromBody.equals(idFromPath);
    }
}

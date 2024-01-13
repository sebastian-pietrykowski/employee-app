package com.bootcamp.backend.backend.project;

import com.bootcamp.backend.backend.employee.Employee;
import com.bootcamp.backend.backend.employee.exception.EmployeeNotFoundException;
import com.bootcamp.backend.backend.mappers.MapStructMapper;
import com.bootcamp.backend.backend.project.exception.DifferentProjectIdInPathAndBodyException;
import com.bootcamp.backend.backend.project.exception.ProjectAlreadyExistsException;
import com.bootcamp.backend.backend.project.exception.ProjectNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProjectService {
    private final MapStructMapper mapStructMapper;
    private final ProjectRepository projectRepository;

    public ProjectDto addProject(ProjectDto projectDto) {
        Project project = mapStructMapper.projectDtoToProject(projectDto);
        throwExceptionIfProjectAlreadyExists(project);
        Project savedProject = projectRepository.save(project);

        return mapStructMapper.projectToProjectDto(savedProject);
    }

    public void deleteProjectById(UUID id) {
        projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
        projectRepository.deleteById(id);
    }

    public ProjectDto getProjectById(UUID id) {
        Project foundProject = getProjectModelById(id);
        return mapStructMapper.projectToProjectDto(foundProject);
    }

    public Project getProjectModelById(UUID id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
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
        Project projectWithUpdates = mapStructMapper.projectDtoToProject(projectDto);
        checkIfIdsFromPathAndBodyMatch(idFromPath, projectWithUpdates.getId());
        throwExceptionIfProjectNotFound(projectWithUpdates);
        Project savedProject = projectRepository.save(projectWithUpdates);

        return mapStructMapper.projectToProjectDto(savedProject);
    }

    private void checkIfIdsFromPathAndBodyMatch(UUID idFromPath, UUID idFromBody) {
        if (!idFromBody.equals(idFromPath)) {
            throw new DifferentProjectIdInPathAndBodyException(idFromPath, idFromBody);
        }
    }

    private void throwExceptionIfProjectAlreadyExists(Project project) {
        if (project.getId() != null && projectRepository.existsById(project.getId())) {
            throw new ProjectAlreadyExistsException(project.getId());
        }
    }

    private void throwExceptionIfProjectNotFound(Project project) {
        if (!projectRepository.existsById(project.getId())) {
            throw new ProjectNotFoundException(project.getId());
        }
    }
}

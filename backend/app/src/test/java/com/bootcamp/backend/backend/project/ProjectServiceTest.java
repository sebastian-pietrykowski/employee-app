package com.bootcamp.backend.backend.project;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {
    @Autowired
    ProjectRepository projectRepository;


    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void addProject() {
    }

    @Test
    void deleteProjectById() {
    }

    @Test
    void getProjectById() {
    }

    @Test
    void getProjectModelById() {
    }

    @Test
    void getProjects() {
    }

    @Test
    void getProjectsByNameContaining() {
    }

    @Test
    void updateProject() {
    }
}
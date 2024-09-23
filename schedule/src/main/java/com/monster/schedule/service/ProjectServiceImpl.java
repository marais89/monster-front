package com.monster.schedule.service;

import com.monster.schedule.dto.ProjectDto;
import com.monster.schedule.mapper.ProjectMapper;
import com.monster.schedule.model.Project;
import com.monster.schedule.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {


    private final ProjectRepository projectRepository;


    private final ProjectMapper projectMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public List<ProjectDto> findByBusinessId(int businessId) {
        List<Project> projects = projectRepository.findProjectByBusinessId(businessId);
        return projects.stream().map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDto> save(ProjectDto project) {

        projectRepository.save(projectMapper.toEntity(project));
        List<Project> projects = projectRepository.findProjectByBusinessId(project.businessId);
        return projects.stream().map(projectMapper::toDto)
                .collect(Collectors.toList());
    }
}

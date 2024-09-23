package com.monster.schedule.service;

import java.util.List;

import com.monster.schedule.dto.ProjectDto;


public interface ProjectService {

    List<ProjectDto> findByBusinessId(int businessId);

    List<ProjectDto> save(ProjectDto project);
}

package com.monster.schedule.facade;

import java.util.List;

import com.monster.schedule.dto.Period;
import com.monster.schedule.dto.ProjectDto;
import com.monster.schedule.dto.ScheduleDto;
import com.monster.schedule.service.ProjectService;
import com.monster.schedule.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleFacade {

    @Autowired
    private final ProjectService projectService;

    @Autowired
    private final ScheduleService sheaduleService;

    public ScheduleFacade(ProjectService projectService, ScheduleService sheaduleService) {
        this.projectService = projectService;
        this.sheaduleService = sheaduleService;
    }

    public List<ProjectDto> findByBusinessId(int businessId) {
        return projectService.findByBusinessId(businessId);
    }

    public List<ScheduleDto> retrieveDailyPlanningbyPeriod(Integer relationId, Period period) {

        return sheaduleService.retrieveDailyPlanningbyPeriod(relationId, period);
    }

    public List<ScheduleDto> save(List<ScheduleDto> schedules) {
        return sheaduleService.save(schedules);
    }

    public List<ProjectDto> saveProject(ProjectDto project) {

        return projectService.save(project);
    }
}

package com.monster.schedule.service;

import java.util.List;

import com.monster.schedule.dto.Period;
import com.monster.schedule.dto.ProjectDto;
import com.monster.schedule.dto.ScheduleDto;

public interface ScheduleService {


    List<ScheduleDto> retrieveDailyPlanningbyPeriod(int relationId, Period period);

    List<ScheduleDto> save(List<ScheduleDto> schedules);

}

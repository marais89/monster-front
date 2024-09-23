package com.monster.schedule.dto;

import java.time.LocalDate;
import java.util.List;

public class ScheduleDto {

    public Integer id;
    public LocalDate planningDate;
    public Integer relationId;
    public List<ActivityDto> activities;
    public boolean holiday;

}

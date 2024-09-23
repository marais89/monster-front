package com.monster.schedule.controller;

import com.monster.schedule.dto.HolidayDto;
import com.monster.schedule.dto.Period;
import com.monster.schedule.dto.ProjectDto;
import com.monster.schedule.dto.ScheduleDto;
import com.monster.schedule.facade.ScheduleFacade;
import com.monster.schedule.service.HolidayService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Api(tags = "schedule")
@RestController
public class ScheduleController {


    public static final String BUSINESS_ID = "businessId";
    public static final String END_DATE = "endDate";
    public static final String START_DATE = "startDate";
    public static final String RELATIONID = "relationId";
    @Autowired
    private final ScheduleFacade scheduleFacade;

    @Autowired
    private final HolidayService holidayService;

    public ScheduleController(ScheduleFacade scheduleFacade, HolidayService holidayService) {
        this.scheduleFacade = scheduleFacade;
        this.holidayService = holidayService;
    }

    @RequestMapping(path = "/project/businessId/{businessId}", method = RequestMethod.GET)
    @ApiOperation(value = "get projects", authorizations = @Authorization("jwt"))
    public List<ProjectDto> findProjectByBusinessId(@PathVariable(BUSINESS_ID) int businessId) {
        return scheduleFacade.findByBusinessId(businessId);
    }

    @PostMapping("/project/save")
    @ApiOperation(value = "save new project", authorizations = @Authorization("jwt"))
    public List<ProjectDto> saveProject(@RequestBody ProjectDto project) {
        return scheduleFacade.saveProject(project);
    }

    @RequestMapping(path = "/schedule/relationId/{relationId}", method = RequestMethod.POST)
    @ApiOperation(value = "get daily planning by period", authorizations = @Authorization("jwt"))
    public List<ScheduleDto> retrievePlannigByPeriod(@PathVariable(RELATIONID) Integer relationId, @RequestBody Period period) {
        return scheduleFacade.retrieveDailyPlanningbyPeriod(relationId, period);
    }

    @RequestMapping(path = "/schedule/save", method = RequestMethod.POST)
    @ApiOperation(value = "save plannings", authorizations = @Authorization("jwt"))
    public List<ScheduleDto> saveSchedule(@RequestBody List<ScheduleDto> schedules) {
        return scheduleFacade.save(schedules);
    }

    @RequestMapping(path = "/holidays/startDate/{startDate}/endDate/{endDate}", method = RequestMethod.GET)
    @ApiOperation(value = "get holidays date for a specific period", authorizations = @Authorization("jwt"))
    public List<HolidayDto> findHolidaysByDateBetween(@PathVariable(START_DATE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                      @PathVariable(END_DATE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return holidayService.findByDateBetween(startDate, endDate);
    }


}

package com.monster.schedule.service;

import com.monster.schedule.dto.HolidayDto;
import com.monster.schedule.dto.Period;
import com.monster.schedule.dto.ScheduleDto;
import com.monster.schedule.dto.ScheduleReportDto;
import com.monster.schedule.mapper.HolidaysMapper;
import com.monster.schedule.mapper.ScheduleMapper;
import com.monster.schedule.model.Schedule;
import com.monster.schedule.model.ScheduleReportStatus;
import com.monster.schedule.repository.ActivityRepository;
import com.monster.schedule.repository.DailyPlanningRepository;
import com.monster.schedule.repository.HolidaysRepository;
import com.monster.schedule.repository.ProjectRepository;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {


    private final DailyPlanningRepository dailyPlanningRepository;

    private final ActivityRepository activityRepository;

    private final HolidaysRepository holidaysRepository;

    private final ScheduleReportService scheduleReportService;

    private final ProjectRepository projectRepository;

    private final ScheduleMapper scheduleMapper;

    private final HolidaysMapper holidaysMapper;

    public ScheduleServiceImpl(DailyPlanningRepository dailyPlanningRepository, ActivityRepository activityRepository, HolidaysRepository holidaysRepository, ScheduleReportService scheduleReportService, ProjectRepository projectRepository, ScheduleMapper scheduleMapper, HolidaysMapper holidaysMapper) {
        this.dailyPlanningRepository = dailyPlanningRepository;
        this.activityRepository = activityRepository;
        this.holidaysRepository = holidaysRepository;
        this.scheduleReportService = scheduleReportService;
        this.projectRepository = projectRepository;
        this.scheduleMapper = scheduleMapper;
        this.holidaysMapper = holidaysMapper;
    }

    @Override
    public List<ScheduleDto> retrieveDailyPlanningbyPeriod(int relationId, Period period) {

        List<Schedule> dailyPlanningList = dailyPlanningRepository.findByRelationIdAndPlanningDateBetween(relationId, period.startDate, period.endDate);
        return dailyPlanningList.stream().map(scheduleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDto> save(List<ScheduleDto> schedulesDto) {

        //Group schedules by month
        Map<YearMonth, List<ScheduleDto>> map = schedulesDto.stream().collect(Collectors.groupingBy(a -> YearMonth.from(a.planningDate)));

        // Verify that schedule report is still in progress
        map.forEach((yearMonth, scheduleDtos) -> {
            ScheduleReportDto scheduleReportDto = null;
            try {
                scheduleReportDto = scheduleReportService.getScheduleRepportByMonthAndRelationId(yearMonth, scheduleDtos.get(0).relationId);

                if (null == scheduleReportDto) {
                    ScheduleReportDto newScheduleReport = buildNewScheduleReprt(yearMonth, scheduleDtos);
                    scheduleReportService.saveScheduleRepport(newScheduleReport);
                    saveDailyPlannings(scheduleDtos);
                } else if (scheduleReportDto.status.equals(ScheduleReportStatus.IN_PROGRESS)
                        || scheduleReportDto.status.equals(ScheduleReportStatus.REWORK)
                        || scheduleReportDto.status.equals(ScheduleReportStatus.DONE)) {
                    saveDailyPlannings(scheduleDtos);
                    //verify and update schedule reports status
                    LocalDate first = yearMonth.atDay(1);
                    //verify if last is last day of month of localdate or last day of actual month !
                    LocalDate last = yearMonth.atEndOfMonth();
                   // int nbDayOfMonth = countWorkingDays(yearMonth.getYear(), yearMonth.getMonthValue());
                    Iterable<Schedule> schedules = dailyPlanningRepository.findByRelationIdAndPlanningDateBetween(scheduleDtos.get(0).relationId, first, last);

                    List<Schedule> schedulesList = new ArrayList<>();
                    schedules.forEach(schedulesList::add);
                    LocalDate currentDayOfMonth = LocalDate.of(yearMonth.getYear(), yearMonth.getMonthValue(), 1);
                    LocalDate lastDayOfMonth = currentDayOfMonth.withDayOfMonth(currentDayOfMonth.lengthOfMonth());

                    //retrive holidays of year and month
                    List<HolidayDto> holidays =  holidaysRepository.findByDateBetween(currentDayOfMonth, lastDayOfMonth)
                            .stream()
                            .map(holidaysMapper::toDto)
                            .collect(Collectors.toList());
                    boolean planningCompleted = schedulesList.stream()
                            .filter(sc -> sc.getActivities().size() == 0)
                            .filter(sc -> sc.getPlanningDate().getDayOfWeek() != DayOfWeek.SATURDAY)
                            .filter(sc -> sc.getPlanningDate().getDayOfWeek() != DayOfWeek.SUNDAY)
                            .allMatch( sc -> holidays.stream().anyMatch(h -> sc.getPlanningDate().equals(h.date)));

                   // Long schuduledDays = ((List<Schedule>) schedules).stream().filter(sc -> sc.getActivities().size() > 0).count();
                    if (planningCompleted) {
                        scheduleReportDto.status = ScheduleReportStatus.DONE;
                        scheduleReportService.saveScheduleRepport(scheduleReportDto);
                    }else if (scheduleReportDto.status != ScheduleReportStatus.IN_PROGRESS){
                        scheduleReportDto.status = ScheduleReportStatus.IN_PROGRESS;
                        scheduleReportService.saveScheduleRepport(scheduleReportDto);
                    }
                } else {
                    //else do nothing because shedule report is in status VALIDATED, OR REPORTED
                    // remove schedules from map
                    map.remove(yearMonth);
                }
            } catch (NotFoundException e) {
                throw new RuntimeException(e);
            }
        });

        //return updated schedules
        Period period = new Period(schedulesDto.get(0).planningDate, schedulesDto.get(schedulesDto.size() - 1).planningDate);
        return retrieveDailyPlanningbyPeriod(schedulesDto.get(0).relationId, period);
    }

    private static <T> boolean verifyMatchingElements(List<T> list1, List<T> list2) {
        // Check if each element of list1 is contained in list2
        return list1.stream().allMatch(list2::contains);
    }

    //TODO URGENT
    //verify all day of month and not just count number of saved day

    private int countWorkingDays(int year, int month) {
        int workingDays = 0;

        LocalDate currentDayOfMonth = LocalDate.of(year, month, 1);
        LocalDate lastDayOfMonth = currentDayOfMonth.withDayOfMonth(currentDayOfMonth.lengthOfMonth());

        //retrive holidays of year and month
        List<HolidayDto> holidays =  holidaysRepository.findByDateBetween(currentDayOfMonth, lastDayOfMonth)
                .stream()
                .map(holidaysMapper::toDto)
                .collect(Collectors.toList());


        while (!currentDayOfMonth.isAfter(lastDayOfMonth)) {
            //ATTETION not count SATURDAY and SUNDAY
            LocalDate finalCurrentDayOfMonth = currentDayOfMonth;
            if (currentDayOfMonth.getDayOfWeek() != DayOfWeek.SATURDAY && currentDayOfMonth.getDayOfWeek() != DayOfWeek.SUNDAY
                    && holidays.stream().noneMatch(h -> h.date == finalCurrentDayOfMonth)) {
                workingDays++;
            }
            currentDayOfMonth = currentDayOfMonth.plusDays(1);
        }

        return workingDays;
    }

    private void saveDailyPlannings(List<ScheduleDto> schedulesDto) {
        List<Schedule> schedules = schedulesDto.stream().map(scheduleMapper::toEntity).collect(Collectors.toList());
        dailyPlanningRepository.saveAll(schedules);
        schedules.forEach(ss -> {
            ss.getActivities().stream().forEach(a -> a.setScheduleid(ss.getId()));
        });
        schedules.forEach(s ->
                { activityRepository.deleteActivitiesByScheduleid(s.getId());
                    activityRepository.saveAll(s.getActivities());}
        );
    }

    private static ScheduleReportDto buildNewScheduleReprt(YearMonth yearMonth, List<ScheduleDto> scheduleDtos) {
        ScheduleReportDto newScheduleReport = new ScheduleReportDto();
        newScheduleReport.monthRepport = yearMonth;
        newScheduleReport.relationId = scheduleDtos.get(0).relationId;
        newScheduleReport.status = ScheduleReportStatus.IN_PROGRESS;
        return newScheduleReport;
    }
}

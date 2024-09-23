package com.monster.schedule.service;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import com.monster.schedule.dto.ScheduleReportDto;
import com.monster.schedule.mapper.ScheduleMapper;
import com.monster.schedule.model.ScheduleReport;
import com.monster.schedule.model.ScheduleReportStatus;
import com.monster.schedule.repository.ScheduleReportRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleReportServiceImpl implements ScheduleReportService {

    @Autowired
    private final ScheduleReportRepository scheduleReportRepository;

    @Autowired
    private final ScheduleMapper scheduleMapper;

    static final String YEAR_MONTH_FORMAT = "yyyy/MM";

    public ScheduleReportServiceImpl(ScheduleReportRepository scheduleReportRepository, ScheduleMapper scheduleMapper) {
        this.scheduleReportRepository = scheduleReportRepository;
        this.scheduleMapper = scheduleMapper;
    }

    public ScheduleReportDto getScheduleRepportByMonthAndRelationId(YearMonth yearMonth, int relationId) throws NotFoundException {
        return scheduleMapper.toDto(scheduleReportRepository.findScheduleReportByMonthRepportAndRelationId(toText(yearMonth), relationId).stream().findFirst().orElse(null));
    }

    @Override
    public ScheduleReportDto saveScheduleRepport(ScheduleReportDto scheduleRepportDto) {
        return scheduleMapper.toDto(scheduleReportRepository.save(scheduleMapper.toEntity(scheduleRepportDto)));
    }

    @Override
    public ScheduleReportDto updateScheduleRepport(int scheduleReportId, ScheduleReportStatus status) throws NotFoundException {
        Optional<ScheduleReport> scheduleReport = scheduleReportRepository.findById(scheduleReportId);
        if (scheduleReport.isPresent()) {
            ScheduleReport scheduleReportToUpdate;
            scheduleReportToUpdate = scheduleReport.get();
            scheduleReportToUpdate.setStatus(status);
            return scheduleMapper.toDto(scheduleReportRepository.save(scheduleReportToUpdate));
        }
        throw new NotFoundException("Shedule report not found !");
    }

    private static String toText(YearMonth yearMonth) throws NotFoundException {
        if (null == yearMonth) {
            throw new NotFoundException("empty year and month of schedule report !");
        }
        return yearMonth.format(DateTimeFormatter.ofPattern(YEAR_MONTH_FORMAT));
    }
}

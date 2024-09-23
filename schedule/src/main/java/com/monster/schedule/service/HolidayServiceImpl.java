package com.monster.schedule.service;

import com.monster.schedule.dto.HolidayDto;
import com.monster.schedule.mapper.HolidaysMapper;
import com.monster.schedule.repository.HolidaysRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HolidayServiceImpl implements HolidayService {

    private final HolidaysRepository holidaysRepository;
    private final HolidaysMapper holidaysMapper;

    public HolidayServiceImpl(HolidaysRepository holidaysRepository, HolidaysMapper holidaysMapper) {
        this.holidaysRepository = holidaysRepository;
        this.holidaysMapper = holidaysMapper;
    }

    @Override
    public List<HolidayDto> findByDateBetween(LocalDate start, LocalDate end) {
        return holidaysRepository.findByDateBetween(start, end)
                .stream()
                .map(holidaysMapper::toDto)
                .collect(Collectors.toList());
    }
}

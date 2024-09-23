package com.monster.schedule.service;

import com.monster.schedule.dto.HolidayDto;

import java.time.LocalDate;
import java.util.List;

public interface HolidayService {

    List<HolidayDto> findByDateBetween(LocalDate start, LocalDate end);
}

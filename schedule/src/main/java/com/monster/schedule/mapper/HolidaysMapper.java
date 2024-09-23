package com.monster.schedule.mapper;

import com.monster.schedule.dto.HolidayDto;
import com.monster.schedule.model.Holiday;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HolidaysMapper {

    HolidayDto toDto(Holiday holiday);

    Holiday toEntity(HolidayDto holidayDto);
}

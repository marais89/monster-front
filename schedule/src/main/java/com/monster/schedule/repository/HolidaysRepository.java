package com.monster.schedule.repository;

import com.monster.schedule.model.Holiday;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidaysRepository extends CrudRepository<Holiday, Integer> {


    @Transactional
    List<Holiday> findByDateBetween(LocalDate start, LocalDate end);
}

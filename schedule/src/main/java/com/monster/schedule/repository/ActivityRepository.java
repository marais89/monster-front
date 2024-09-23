package com.monster.schedule.repository;

import com.monster.schedule.model.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Integer> {

    @Transactional
    void deleteActivitiesByScheduleid(int scheduleId);
}

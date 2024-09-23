package com.monster.business.repository;

import java.util.List;

import com.monster.business.entity.BusinessGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessGroupRepository extends CrudRepository<BusinessGroup, Integer> {

    List<BusinessGroup> findBusinessGroupByIdBusiness(int idBusiness);

    List<BusinessGroup> findBusinessGroupByName(String name);
}

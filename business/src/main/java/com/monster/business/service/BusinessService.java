package com.monster.business.service;

import java.util.List;

import com.monster.business.dto.BusinessDto;
import com.monster.business.dto.BusinessGroupDto;
import com.monster.business.dto.UserBusinessRelationDto;
import com.monster.business.entity.UserBusinessStatus;
import javassist.NotFoundException;


public interface BusinessService {

    BusinessDto getBusinessByCreatorId(long userName);

    BusinessDto saveBusiness(BusinessDto businessDto);

    BusinessGroupDto saveBusinessGroup(BusinessGroupDto businessGroupDto);

    List<BusinessGroupDto> findBusinessGroupByBusinessId(int businessId);

    BusinessGroupDto updateStatusBusinessGroup(int idBusinessGroup, boolean status) throws NotFoundException;

    List<UserBusinessRelationDto> saveUserBusinessRelation(UserBusinessRelationDto userBusinessRelationDto);

    List<UserBusinessRelationDto> findUserBusinessRelationByUserEmail(String email);

    List<UserBusinessRelationDto> findUserBusinessRelationByBusinessId(int businessId);

    List<UserBusinessRelationDto> findUserBusinessRelationByGroupId(int groupId);

    UserBusinessRelationDto updateStatusUserBusinessRelation(int userBusinessRelationId, UserBusinessStatus status) throws NotFoundException;


    List<UserBusinessRelationDto> findUserBusinessRelationByBusinessIdAndEmail(int businessId, String email);
}

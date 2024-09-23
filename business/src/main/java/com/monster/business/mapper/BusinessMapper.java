package com.monster.business.mapper;

import com.monster.business.dto.BusinessDto;
import com.monster.business.dto.BusinessGroupDto;
import com.monster.business.dto.UserBusinessRelationDto;
import com.monster.business.entity.Business;
import com.monster.business.entity.BusinessGroup;
import com.monster.business.entity.UserBusinessRelation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BusinessMapper {

    @Mapping(source = "business.status", target = "status")
    BusinessDto mapToDto(Business business);

    Business mapToEntity(BusinessDto businessDto);

    BusinessGroupDto mapToDto(BusinessGroup businessGroup);

    BusinessGroup mapToEntity(BusinessGroupDto businessGroupDto);

    @Mapping(source = "business.id", target = "businessId")
    @Mapping(source = "businessGroup.id", target = "groupId")
    UserBusinessRelation mapToEntity(UserBusinessRelationDto userBusinessRelation);

    UserBusinessRelationDto mapToDto(UserBusinessRelation userBusinessRelationDto);

}

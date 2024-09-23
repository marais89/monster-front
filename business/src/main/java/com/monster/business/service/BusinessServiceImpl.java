package com.monster.business.service;

import com.monster.business.dto.BusinessDto;
import com.monster.business.dto.BusinessGroupDto;
import com.monster.business.dto.BusinessStatus;
import com.monster.business.dto.UserBusinessRelationDto;
import com.monster.business.entity.*;
import com.monster.business.mapper.BusinessMapper;
import com.monster.business.repository.BusinessGroupRepository;
import com.monster.business.repository.BusinessRepository;
import com.monster.business.repository.UserBusinessRelationRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private BusinessGroupRepository businessGroupRepository;

    @Autowired
    private UserBusinessRelationRepository userBusinessRelationRepository;

    @Autowired
    private BusinessMapper businessMapper;

    @Override
    public BusinessDto getBusinessByCreatorId(long creatorId) {
        List<Business> businessList = businessRepository.findBusinessByCreatorId((int) creatorId);
        return businessList.stream().findFirst().map(businessMapper::mapToDto).orElse(null);
    }

    @Override
    public BusinessDto saveBusiness(BusinessDto businessDto) {
        businessDto.status = BusinessStatus.WAITING;
        businessDto.creationDate = LocalDateTime.now();
        return businessMapper.mapToDto(businessRepository.save(businessMapper.mapToEntity(businessDto)));
    }

    @Override
    public BusinessGroupDto saveBusinessGroup(BusinessGroupDto businessGroupDto) throws IllegalStateException {

        if (businessGroupDto.id == 0) {
            List<BusinessGroup> sameBusinessGroup = businessGroupRepository.findBusinessGroupByName(businessGroupDto.name);
            if (sameBusinessGroup.size() > 0) {
                throw new IllegalStateException("this business group exist");
            }
        }
        return businessMapper.mapToDto(businessGroupRepository.save(businessMapper.mapToEntity(businessGroupDto)));
    }

    @Override
    public List<BusinessGroupDto> findBusinessGroupByBusinessId(int businessId) {

        return businessGroupRepository.findBusinessGroupByIdBusiness(businessId)
                .stream()
                .map(bg -> businessMapper.mapToDto(bg))
                .collect(Collectors.toList());
    }

    @Override
    public BusinessGroupDto updateStatusBusinessGroup(int idBusinessGroup, boolean status) throws NotFoundException {

        Optional<BusinessGroup> businessGroup = businessGroupRepository.findById(idBusinessGroup);
        if (businessGroup.isPresent()) {
            businessGroup.get().setActive(status);
            return businessMapper.mapToDto(businessGroupRepository.save(businessGroup.get()));
        }
        throw new NotFoundException("Business Group not found !");
    }

    @Override
    public List<UserBusinessRelationDto> saveUserBusinessRelation(UserBusinessRelationDto userBusinessRelationDto) {

        if (userBusinessRelationDto.id == 0) {

            List<UserBusinessRelation> ubrs = userBusinessRelationRepository.findUserBusinessRelationByBusinessIdAndEmail(userBusinessRelationDto.business.id, userBusinessRelationDto.email);
            boolean isUserBusiessRelationExist = ubrs.stream().filter(ubr -> !ubr.getStatus().equals(UserBusinessStatus.DISABLE))
                    .anyMatch(ubr -> ubr.getRole() == userBusinessRelationDto.role);
            if (isUserBusiessRelationExist) {
                throw new IllegalStateException("The user with email " + userBusinessRelationDto.email + " already has the role of "
                        + userBusinessRelationDto.role + " in the business " + userBusinessRelationDto.business.name + ".");
            }
        } else {
            if (userBusinessRelationDto.role == UserBusinessRole.ADMIN ||
                    userBusinessRelationDto.role == UserBusinessRole.LEADER) {

                // vérifier que le clien exist et actif si non throw exception
            }
            Optional<UserBusinessRelation> ubr = userBusinessRelationRepository.findById(userBusinessRelationDto.id);

            List<UserBusinessRelation> ubrs = userBusinessRelationRepository.findUserBusinessRelationByBusinessId(userBusinessRelationDto.business.id)
                    .stream()
                    .filter(u -> !u.getStatus().equals(UserBusinessStatus.DISABLE))
                    .filter(u -> u.getRole() == UserBusinessRole.ADMIN)
                    .filter(u -> !u.getEmail().equals(userBusinessRelationDto.email))
                    .collect(Collectors.toList());
            // Si l'utilisateur été admin et a changé de role et pas d'autres admin throw exception
            if (ubr.isPresent() && ubr.get().getRole() == UserBusinessRole.ADMIN
                    && userBusinessRelationDto.role != UserBusinessRole.ADMIN && ubrs.size() == 0) {
                throw new IllegalStateException("You should have at least one Admin at this business");
            }
        }
        userBusinessRelationRepository.save(businessMapper.mapToEntity(userBusinessRelationDto));
        return userBusinessRelationRepository.findUserBusinessRelationByBusinessId(userBusinessRelationDto.business.id)
                .stream()
                .map(ubr -> businessMapper.mapToDto(ubr))
                .collect(Collectors.toList());
    }

    public List<UserBusinessRelationDto> findUserBusinessRelationByUserEmail(String email) {

        return userBusinessRelationRepository.findUserBusinessRelationsByEmail(email)
                .stream()
                .map(ubr -> businessMapper.mapToDto(ubr))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserBusinessRelationDto> findUserBusinessRelationByBusinessId(int businessId) {
        return userBusinessRelationRepository.findUserBusinessRelationByBusinessId(businessId)
                .stream()
                .map(ubr -> businessMapper.mapToDto(ubr))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserBusinessRelationDto> findUserBusinessRelationByGroupId(int groupId) {
        return userBusinessRelationRepository.findUserBusinessRelationByGroupId(groupId)
                .stream()
                .map(ubr -> businessMapper.mapToDto(ubr))
                .collect(Collectors.toList());
    }

    @Override
    public UserBusinessRelationDto updateStatusUserBusinessRelation(int userBusinessRelationId, UserBusinessStatus status) throws NotFoundException {
        Optional<UserBusinessRelation> ubr = userBusinessRelationRepository.findById(userBusinessRelationId);
        if (ubr.isPresent()) {
            ubr.get().setStatus(status);
            return businessMapper.mapToDto(userBusinessRelationRepository.save(ubr.get()));
        }
        throw new NotFoundException("user business relation not found  !");
    }

    @Override
    public List<UserBusinessRelationDto> findUserBusinessRelationByBusinessIdAndEmail(int businessId, String email) {
        return userBusinessRelationRepository.findUserBusinessRelationByBusinessIdAndEmail(businessId, email)
                .stream()
                .map(ubr -> businessMapper.mapToDto(ubr))
                .collect(Collectors.toList());
    }


}

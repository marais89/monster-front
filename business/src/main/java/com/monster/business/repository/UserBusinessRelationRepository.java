package com.monster.business.repository;

import java.util.List;

import com.monster.business.entity.UserBusinessRelation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBusinessRelationRepository extends CrudRepository<UserBusinessRelation, Integer> {

    List<UserBusinessRelation> findUserBusinessRelationsByEmail(String email);

    List<UserBusinessRelation> findUserBusinessRelationByBusinessIdAndEmail(int businessId, String email);

    List<UserBusinessRelation> findUserBusinessRelationByBusinessId(int businessId);

    List<UserBusinessRelation> findUserBusinessRelationByGroupId(int groupId);
}

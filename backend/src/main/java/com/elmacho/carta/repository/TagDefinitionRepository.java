package com.elmacho.carta.repository;

import com.elmacho.carta.entity.TagDefinition;
import com.elmacho.carta.entity.TagType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagDefinitionRepository extends JpaRepository<TagDefinition, Long> {
    
    Optional<TagDefinition> findByCode(String code);
    
    List<TagDefinition> findByActiveTrueOrderByDisplayOrderAsc();
    
    List<TagDefinition> findByTagTypeAndActiveTrueOrderByDisplayOrderAsc(TagType tagType);
    
    boolean existsByCode(String code);
}

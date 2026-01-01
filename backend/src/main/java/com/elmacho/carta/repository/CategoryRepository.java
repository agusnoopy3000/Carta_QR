package com.elmacho.carta.repository;

import com.elmacho.carta.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    Optional<Category> findByCode(String code);
    
    List<Category> findByActiveTrueOrderByDisplayOrderAsc();
    
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.products p " +
           "WHERE c.active = true AND (p IS NULL OR p.active = true AND p.available = true) " +
           "ORDER BY c.displayOrder ASC, p.displayOrder ASC")
    List<Category> findAllActiveWithAvailableProducts();
    
    boolean existsByCode(String code);
}

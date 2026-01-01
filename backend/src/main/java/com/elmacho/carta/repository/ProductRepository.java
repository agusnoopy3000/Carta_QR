package com.elmacho.carta.repository;

import com.elmacho.carta.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Optional<Product> findByCode(String code);
    
    List<Product> findByCategoryIdAndActiveTrueAndAvailableTrueOrderByDisplayOrderAsc(Long categoryId);
    
    List<Product> findByActiveTrueAndAvailableTrueOrderByDisplayOrderAsc();
    
    List<Product> findByFeaturedTrueAndActiveTrueAndAvailableTrueOrderByDisplayOrderAsc();
    
    List<Product> findByRecommendedTrueAndActiveTrueAndAvailableTrueOrderByDisplayOrderAsc();
    
    List<Product> findByCatchOfDayTrueAndActiveTrueAndAvailableTrueOrderByDisplayOrderAsc();
    
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.options o LEFT JOIN FETCH p.tags t " +
           "WHERE p.category.id = :categoryId AND p.active = true AND p.available = true " +
           "ORDER BY p.displayOrder ASC")
    List<Product> findByCategoryWithOptionsAndTags(@Param("categoryId") Long categoryId);
    
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.options o LEFT JOIN FETCH p.tags t " +
           "WHERE p.active = true AND p.available = true " +
           "ORDER BY p.displayOrder ASC")
    List<Product> findAllAvailableWithOptionsAndTags();
    
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.options o " +
           "WHERE p.featured = true AND p.active = true AND p.available = true")
    List<Product> findFeaturedWithOptions();
    
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.options o " +
           "WHERE p.catchOfDay = true AND p.active = true AND p.available = true")
    List<Product> findCatchOfDayWithOptions();
    
    boolean existsByCode(String code);
    
    // Admin queries
    List<Product> findByCategoryIdOrderByDisplayOrderAsc(Long categoryId);
    
    List<Product> findAllByOrderByDisplayOrderAsc();
}

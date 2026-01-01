package com.elmacho.carta.repository;

import com.elmacho.carta.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {
    
    List<ProductOption> findByProductIdAndActiveTrueAndAvailableTrueOrderByDisplayOrderAsc(Long productId);
    
    List<ProductOption> findByProductIdOrderByDisplayOrderAsc(Long productId);
    
    @Modifying
    @Query("UPDATE ProductOption o SET o.price = :price, o.updatedAt = CURRENT_TIMESTAMP WHERE o.id = :optionId")
    int updatePrice(@Param("optionId") Long optionId, @Param("price") BigDecimal price);
    
    @Modifying
    @Query("UPDATE ProductOption o SET o.available = :available, o.updatedAt = CURRENT_TIMESTAMP WHERE o.id = :optionId")
    int updateAvailability(@Param("optionId") Long optionId, @Param("available") Boolean available);
    
    @Query("SELECT MIN(o.price) FROM ProductOption o WHERE o.product.id = :productId AND o.active = true AND o.available = true")
    BigDecimal findMinPriceByProductId(@Param("productId") Long productId);
}

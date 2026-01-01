package com.elmacho.carta.dto;

import lombok.*;
import java.math.BigDecimal;

/**
 * DTO para Opción de Producto (vista pública)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOptionDTO {
    
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Boolean hasDiscount;
    private BigDecimal discountPercentage;
    private String optionType;
    private Integer servesPeople;
    private String sizeCode;
    private String preparationCode;
    private Integer displayOrder;
    private Boolean isDefault;
    private Boolean available;
}

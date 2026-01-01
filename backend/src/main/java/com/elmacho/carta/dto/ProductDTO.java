package com.elmacho.carta.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para Producto (vista pública)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    
    private Long id;
    private String code;
    private String name;
    private String description;
    private String imageUrl;
    private String categoryCode;
    private String categoryName;
    private Integer displayOrder;
    
    // Flags especiales
    private Boolean featured;
    private Boolean recommended;
    private Boolean catchOfDay;
    private Integer spicyLevel;
    private String allergens;
    
    // Precio desde (el menor precio de las opciones disponibles)
    private BigDecimal priceFrom;
    
    // Opciones de producto
    private List<ProductOptionDTO> options;
    
    // Etiquetas del producto
    private List<TagDTO> tags;
}

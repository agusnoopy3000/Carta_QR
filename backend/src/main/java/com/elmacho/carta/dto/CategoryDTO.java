package com.elmacho.carta.dto;

import lombok.*;
import java.util.List;

/**
 * DTO para Categoría (vista pública)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    
    private Long id;
    private String code;
    private String name;
    private String description;
    private String iconUrl;
    private String imageUrl;
    private Integer displayOrder;
    private List<ProductDTO> products;
    private Integer productCount;
}

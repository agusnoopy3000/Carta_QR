package com.elmacho.carta.dto;

import lombok.*;
import java.util.List;

/**
 * DTO para la carta completa (vista pública)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuResponseDTO {
    
    private String restaurantName;
    private String slogan;
    private String language;
    private List<CategoryDTO> categories;
    private List<ProductDTO> featuredProducts;
    private List<ProductDTO> catchOfDay;
}

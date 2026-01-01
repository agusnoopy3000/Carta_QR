package com.elmacho.carta.dto.admin;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

/**
 * DTO para crear/editar Producto (admin)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAdminDTO {
    
    private Long id;
    
    @NotBlank(message = "El código es requerido")
    @Size(max = 50, message = "El código no puede exceder 50 caracteres")
    private String code;
    
    @NotBlank(message = "El nombre en español es requerido")
    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    private String nameEs;
    
    @NotBlank(message = "El nombre en inglés es requerido")
    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    private String nameEn;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descriptionEs;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descriptionEn;
    
    private String imageUrl;
    
    @NotNull(message = "La categoría es requerida")
    private Long categoryId;
    
    @NotNull(message = "El orden es requerido")
    @Min(value = 0, message = "El orden debe ser positivo")
    private Integer displayOrder;
    
    private Boolean active = true;
    private Boolean available = true;
    private Boolean featured = false;
    private Boolean recommended = false;
    private Boolean catchOfDay = false;
    
    @Min(value = 0, message = "El nivel de picante debe ser entre 0 y 3")
    @Max(value = 3, message = "El nivel de picante debe ser entre 0 y 3")
    private Integer spicyLevel;
    
    private String allergensEs;
    private String allergensEn;
    
    private List<ProductOptionAdminDTO> options;
    private List<Long> tagIds;
}

package com.elmacho.carta.dto.admin;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

/**
 * DTO para crear/editar Categoría (admin)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryAdminDTO {
    
    private Long id;
    
    @NotBlank(message = "El código es requerido")
    @Size(max = 50, message = "El código no puede exceder 50 caracteres")
    private String code;
    
    @NotBlank(message = "El nombre en español es requerido")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nameEs;
    
    @NotBlank(message = "El nombre en inglés es requerido")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nameEn;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descriptionEs;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descriptionEn;
    
    private String iconUrl;
    private String imageUrl;
    
    @NotNull(message = "El orden es requerido")
    @Min(value = 0, message = "El orden debe ser positivo")
    private Integer displayOrder;
    
    private Boolean active = true;
}

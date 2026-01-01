package com.elmacho.carta.dto.admin;

import com.elmacho.carta.entity.OptionType;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

/**
 * DTO para crear/editar Opción de Producto (admin)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOptionAdminDTO {
    
    private Long id;
    
    @NotBlank(message = "El nombre en español es requerido")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nameEs;
    
    @NotBlank(message = "El nombre en inglés es requerido")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nameEn;
    
    private String descriptionEs;
    private String descriptionEn;
    
    @NotNull(message = "El precio es requerido")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal price;
    
    private BigDecimal originalPrice;
    
    @NotNull(message = "El tipo de opción es requerido")
    private OptionType optionType;
    
    private Integer servesPeople;
    private String sizeCode;
    private String preparationCode;
    
    @NotNull(message = "El orden es requerido")
    @Min(value = 0, message = "El orden debe ser positivo")
    private Integer displayOrder;
    
    private Boolean active = true;
    private Boolean available = true;
    private Boolean isDefault = false;
}

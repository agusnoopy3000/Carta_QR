package com.elmacho.carta.dto.admin;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

/**
 * DTO para actualización rápida de precios (admin)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuickPriceUpdateDTO {
    
    @NotNull(message = "El ID de la opción es requerido")
    private Long optionId;
    
    @NotNull(message = "El nuevo precio es requerido")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal newPrice;
    
    private BigDecimal originalPrice; // Para mostrar descuento
}

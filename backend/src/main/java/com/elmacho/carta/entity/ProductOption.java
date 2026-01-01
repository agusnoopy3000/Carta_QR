package com.elmacho.carta.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Opción de producto con precio (tamaño, preparación, número de personas)
 * ⚠️ EL PRECIO SIEMPRE VIVE AQUÍ, NUNCA EN PRODUCT
 */
@Entity
@Table(name = "product_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "name_es", nullable = false)
    private String nameEs; // "Porción individual", "Para 2-3 personas", "Media docena"

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "description_es")
    private String descriptionEs; // Descripción adicional de la opción

    @Column(name = "description_en")
    private String descriptionEn;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price; // ⚠️ PRECIO SIEMPRE AQUÍ

    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice; // Para mostrar descuentos

    @Enumerated(EnumType.STRING)
    @Column(name = "option_type", nullable = false)
    private OptionType optionType;

    @Column(name = "serves_people")
    private Integer servesPeople; // Número de personas que sirve

    @Column(name = "size_code")
    private String sizeCode; // SMALL, MEDIUM, LARGE, HALF_DOZEN, DOZEN

    @Column(name = "preparation_code")
    private String preparationCode; // GRILLED, FRIED, STEAMED, RAW, etc.

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Boolean available = true;

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false; // Opción por defecto a mostrar

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Helper methods for i18n
    public String getName(String language) {
        return "en".equalsIgnoreCase(language) ? nameEn : nameEs;
    }

    public String getDescription(String language) {
        return "en".equalsIgnoreCase(language) ? descriptionEn : descriptionEs;
    }

    // Check if has discount
    public boolean hasDiscount() {
        return originalPrice != null && originalPrice.compareTo(price) > 0;
    }

    public BigDecimal getDiscountPercentage() {
        if (!hasDiscount()) return BigDecimal.ZERO;
        return originalPrice.subtract(price)
                .divide(originalPrice, 2, java.math.RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
    }
}

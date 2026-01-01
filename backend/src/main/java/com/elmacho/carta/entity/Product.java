package com.elmacho.carta.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Producto base (sin precio directo - el precio vive en ProductOption)
 */
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(name = "name_es", nullable = false)
    private String nameEs;

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "description_es", length = 500)
    private String descriptionEs;

    @Column(name = "description_en", length = 500)
    private String descriptionEn;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<ProductOption> options = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductTag> tags = new ArrayList<>();

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Boolean available = true; // Disponibilidad diaria

    @Column(nullable = false)
    private Boolean featured = false; // Producto destacado

    @Column(nullable = false)
    private Boolean recommended = false; // Recomendado del chef

    @Column(name = "catch_of_day", nullable = false)
    private Boolean catchOfDay = false; // Pesca del día

    @Column(name = "spicy_level")
    private Integer spicyLevel; // 0-3 (null = no aplica)

    @Column(name = "allergens_es")
    private String allergensEs; // Información de alérgenos

    @Column(name = "allergens_en")
    private String allergensEn;

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

    public String getAllergens(String language) {
        return "en".equalsIgnoreCase(language) ? allergensEn : allergensEs;
    }

    // Add helper method to add options
    public void addOption(ProductOption option) {
        options.add(option);
        option.setProduct(this);
    }

    public void addTag(ProductTag tag) {
        tags.add(tag);
        tag.setProduct(this);
    }
}

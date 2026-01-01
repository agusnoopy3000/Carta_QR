package com.elmacho.carta.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * Definición de etiquetas configurables desde backend
 * Ejemplos: "Porción abundante", "Ideal para compartir", "Plato grande"
 */
@Entity
@Table(name = "tag_definitions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagDefinition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code; // ABUNDANT_PORTION, SHARE, LARGE_PLATE, RECOMMENDED_2_3

    @Column(name = "text_es", nullable = false)
    private String textEs;

    @Column(name = "text_en", nullable = false)
    private String textEn;

    @Column(name = "icon_name")
    private String iconName; // Nombre del icono (ej: "users", "fire", "star")

    @Column(name = "background_color")
    private String backgroundColor; // Color de fondo del tag (hex)

    @Column(name = "text_color")
    private String textColor; // Color del texto (hex)

    @Enumerated(EnumType.STRING)
    @Column(name = "tag_type", nullable = false)
    private TagType tagType;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "display_order")
    private Integer displayOrder;

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

    // Helper method for i18n
    public String getText(String language) {
        return "en".equalsIgnoreCase(language) ? textEn : textEs;
    }
}

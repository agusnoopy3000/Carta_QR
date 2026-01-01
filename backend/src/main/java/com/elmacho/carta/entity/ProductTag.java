package com.elmacho.carta.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Etiquetas configurables para productos (ej: "Porción abundante", "Ideal para compartir")
 */
@Entity
@Table(name = "product_tags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_definition_id", nullable = false)
    private TagDefinition tagDefinition;

    @Column(name = "display_order")
    private Integer displayOrder;
}

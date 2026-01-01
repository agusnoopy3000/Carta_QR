package com.elmacho.carta.dto;

import lombok.*;

/**
 * DTO para Etiqueta (vista pública)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagDTO {
    
    private Long id;
    private String code;
    private String text;
    private String iconName;
    private String backgroundColor;
    private String textColor;
    private String tagType;
}

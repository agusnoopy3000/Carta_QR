package com.elmacho.carta.entity;

/**
 * Tipos de etiquetas para productos
 */
public enum TagType {
    PORTION,        // Relacionado con tamaño/porción (Porción abundante, Plato grande)
    SHARING,        // Relacionado con compartir (Ideal para compartir, Para 2-3 personas)
    VALUE,          // Relacionado con valor (Mejor relación precio/cantidad)
    SPECIAL,        // Especiales (Pesca del día, Recomendación del chef)
    DIETARY,        // Dietético (Sin gluten, Vegetariano)
    PROMO           // Promociones (Descuento, Nuevo)
}

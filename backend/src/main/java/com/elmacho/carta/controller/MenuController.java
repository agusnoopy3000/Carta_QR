package com.elmacho.carta.controller;

import com.elmacho.carta.dto.*;
import com.elmacho.carta.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador público para la carta (sin autenticación)
 * Accesible directamente desde el QR
 */
@RestController
@RequestMapping("/v1/menu")
@RequiredArgsConstructor
@Tag(name = "Carta Pública", description = "Endpoints públicos para visualización de la carta")
@CrossOrigin(origins = "*") // Permitir acceso desde cualquier origen (QR)
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    @Operation(summary = "Obtener carta completa", 
               description = "Retorna toda la carta con categorías, productos disponibles, destacados y pesca del día")
    public ResponseEntity<MenuResponseDTO> getFullMenu(
            @Parameter(description = "Idioma (es/en)", example = "es")
            @RequestParam(defaultValue = "es") String lang) {
        return ResponseEntity.ok(menuService.getFullMenu(lang));
    }

    @GetMapping("/categories/{categoryCode}")
    @Operation(summary = "Obtener productos por categoría",
               description = "Retorna los productos disponibles de una categoría específica")
    public ResponseEntity<CategoryDTO> getProductsByCategory(
            @Parameter(description = "Código de la categoría", example = "MENU")
            @PathVariable String categoryCode,
            @Parameter(description = "Idioma (es/en)", example = "es")
            @RequestParam(defaultValue = "es") String lang) {
        return ResponseEntity.ok(menuService.getProductsByCategory(categoryCode, lang));
    }

    @GetMapping("/products/available")
    @Operation(summary = "Obtener productos disponibles",
               description = "Retorna solo los productos actualmente disponibles (para actualización en tiempo real)")
    public ResponseEntity<List<ProductDTO>> getAvailableProducts(
            @Parameter(description = "Idioma (es/en)", example = "es")
            @RequestParam(defaultValue = "es") String lang) {
        return ResponseEntity.ok(menuService.getAvailableProducts(lang));
    }

    @GetMapping("/featured")
    @Operation(summary = "Obtener productos destacados",
               description = "Retorna los productos marcados como destacados")
    public ResponseEntity<List<ProductDTO>> getFeaturedProducts(
            @Parameter(description = "Idioma (es/en)", example = "es")
            @RequestParam(defaultValue = "es") String lang) {
        return ResponseEntity.ok(menuService.getFeaturedProducts(lang));
    }

    @GetMapping("/catch-of-day")
    @Operation(summary = "Obtener pesca del día",
               description = "Retorna los productos marcados como pesca del día")
    public ResponseEntity<List<ProductDTO>> getCatchOfDay(
            @Parameter(description = "Idioma (es/en)", example = "es")
            @RequestParam(defaultValue = "es") String lang) {
        return ResponseEntity.ok(menuService.getCatchOfDay(lang));
    }
}

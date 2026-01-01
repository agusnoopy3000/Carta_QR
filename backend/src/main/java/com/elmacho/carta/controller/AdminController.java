package com.elmacho.carta.controller;

import com.elmacho.carta.dto.admin.*;
import com.elmacho.carta.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador de administración (protegido con autenticación)
 */
@RestController
@RequestMapping("/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Administración", description = "Endpoints protegidos para gestión de la carta")
@SecurityRequirement(name = "basicAuth")
public class AdminController {

    private final AdminService adminService;

    // ============== CATEGORÍAS ==============

    @GetMapping("/categories")
    @Operation(summary = "Listar todas las categorías")
    public ResponseEntity<List<CategoryAdminDTO>> getAllCategories() {
        return ResponseEntity.ok(adminService.getAllCategories());
    }

    @GetMapping("/categories/{id}")
    @Operation(summary = "Obtener categoría por ID")
    public ResponseEntity<CategoryAdminDTO> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCategoryById(id));
    }

    @PostMapping("/categories")
    @Operation(summary = "Crear nueva categoría")
    public ResponseEntity<CategoryAdminDTO> createCategory(@Valid @RequestBody CategoryAdminDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createCategory(dto));
    }

    @PutMapping("/categories/{id}")
    @Operation(summary = "Actualizar categoría")
    public ResponseEntity<CategoryAdminDTO> updateCategory(
            @PathVariable Long id, 
            @Valid @RequestBody CategoryAdminDTO dto) {
        return ResponseEntity.ok(adminService.updateCategory(id, dto));
    }

    @PatchMapping("/categories/{id}/toggle-active")
    @Operation(summary = "Activar/desactivar categoría")
    public ResponseEntity<Void> toggleCategoryActive(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        adminService.toggleCategoryActive(id, body.getOrDefault("active", true));
        return ResponseEntity.ok().build();
    }

    // ============== PRODUCTOS ==============

    @GetMapping("/products")
    @Operation(summary = "Listar todos los productos")
    public ResponseEntity<List<ProductAdminDTO>> getAllProducts() {
        return ResponseEntity.ok(adminService.getAllProducts());
    }

    @GetMapping("/products/category/{categoryId}")
    @Operation(summary = "Listar productos por categoría")
    public ResponseEntity<List<ProductAdminDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(adminService.getProductsByCategory(categoryId));
    }

    @GetMapping("/products/{id}")
    @Operation(summary = "Obtener producto por ID")
    public ResponseEntity<ProductAdminDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getProductById(id));
    }

    @PostMapping("/products")
    @Operation(summary = "Crear nuevo producto")
    public ResponseEntity<ProductAdminDTO> createProduct(@Valid @RequestBody ProductAdminDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createProduct(dto));
    }

    @PutMapping("/products/{id}")
    @Operation(summary = "Actualizar producto")
    public ResponseEntity<ProductAdminDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductAdminDTO dto) {
        return ResponseEntity.ok(adminService.updateProduct(id, dto));
    }

    @PatchMapping("/products/{id}/toggle-available")
    @Operation(summary = "Cambiar disponibilidad del producto")
    public ResponseEntity<Void> toggleProductAvailable(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        adminService.toggleProductAvailable(id, body.getOrDefault("available", true));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/products/{id}/toggle-featured")
    @Operation(summary = "Marcar/desmarcar producto como destacado")
    public ResponseEntity<Void> toggleProductFeatured(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        adminService.toggleProductFeatured(id, body.getOrDefault("featured", false));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/products/{id}/toggle-catch-of-day")
    @Operation(summary = "Marcar/desmarcar producto como pesca del día")
    public ResponseEntity<Void> toggleCatchOfDay(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        adminService.toggleCatchOfDay(id, body.getOrDefault("catchOfDay", false));
        return ResponseEntity.ok().build();
    }

    // ============== PRECIOS (ACTUALIZACIÓN RÁPIDA) ==============

    @PatchMapping("/prices/quick-update")
    @Operation(summary = "Actualización rápida de precio", 
               description = "Permite actualizar el precio de una opción rápidamente")
    public ResponseEntity<Void> quickUpdatePrice(@Valid @RequestBody QuickPriceUpdateDTO dto) {
        adminService.quickUpdatePrice(dto);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/prices/bulk-update")
    @Operation(summary = "Actualización masiva de precios",
               description = "Permite actualizar múltiples precios en una sola operación")
    public ResponseEntity<Void> bulkUpdatePrices(@Valid @RequestBody List<QuickPriceUpdateDTO> updates) {
        adminService.bulkUpdatePrices(updates);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/options/{optionId}/toggle-available")
    @Operation(summary = "Cambiar disponibilidad de una opción")
    public ResponseEntity<Void> toggleOptionAvailable(
            @PathVariable Long optionId,
            @RequestBody Map<String, Boolean> body) {
        adminService.toggleOptionAvailable(optionId, body.getOrDefault("available", true));
        return ResponseEntity.ok().build();
    }
}

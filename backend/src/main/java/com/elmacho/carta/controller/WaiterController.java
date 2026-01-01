package com.elmacho.carta.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * 🔔 Controlador para llamar al garzón
 * Registra eventos cuando un cliente está listo para pedir
 */
@RestController
@RequestMapping("/v1/waiter")
@Slf4j
@CrossOrigin(origins = "*")
public class WaiterController {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * Endpoint para que el cliente llame al garzón
     * Por ahora solo registra el evento en los logs
     */
    @PostMapping("/call")
    public ResponseEntity<Map<String, Object>> callWaiter() {
        LocalDateTime now = LocalDateTime.now();
        String timestamp = now.format(formatter);
        
        // Log del evento con formato destacado para fácil visualización
        log.info("╔══════════════════════════════════════════════════════════════╗");
        log.info("║  🔔 ¡GARZÓN LLAMADO! - Una mesa está lista para pedir        ║");
        log.info("║  📅 Fecha/Hora: {}                              ║", timestamp);
        log.info("║  📍 Mesa: General (sin identificación específica)            ║");
        log.info("╚══════════════════════════════════════════════════════════════╝");
        
        // También log más simple para parsing si es necesario
        log.info("WAITER_CALL_EVENT: timestamp={}, status=PENDING", timestamp);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Garzón notificado exitosamente");
        response.put("timestamp", timestamp);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Health check del servicio de garzón
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "waiter-notification");
        response.put("status", "active");
        response.put("timestamp", LocalDateTime.now().format(formatter));
        
        return ResponseEntity.ok(response);
    }
}

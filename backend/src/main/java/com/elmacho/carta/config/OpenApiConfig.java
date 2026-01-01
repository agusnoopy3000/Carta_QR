package com.elmacho.carta.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@SecurityScheme(
        name = "basicAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "basic"
)
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🦐 El Macho - Carta QR API")
                        .version("1.0.0")
                        .description("""
                            API para la Carta QR Interactiva del Restaurante El Macho.
                            
                            ## Endpoints Públicos (sin autenticación)
                            - `/v1/menu/**` - Carta pública para clientes
                            
                            ## Endpoints de Administración (requieren autenticación)
                            - `/v1/admin/**` - Gestión de productos, precios y categorías
                            
                            ## Idiomas soportados
                            - `es` - Español (por defecto)
                            - `en` - English
                            """)
                        .contact(new Contact()
                                .name("El Macho Restaurant")
                                .email("contacto@elmacho.cl")))
                .servers(List.of(
                        new Server().url("http://localhost:8080/api").description("Desarrollo"),
                        new Server().url("https://api.elmacho.cl/api").description("Producción")
                ));
    }
}

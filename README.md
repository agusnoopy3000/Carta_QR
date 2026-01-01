# 🦐 El Macho - Carta QR Interactiva

Sistema de Carta QR Interactiva para el restaurante **El Macho** - Productos del Mar.

## 📋 Descripción

Carta digital accesible mediante código QR que permite a los clientes visualizar el menú del restaurante de forma rápida y atractiva desde sus dispositivos móviles.

### Características principales:
- ✅ Mobile-first design
- ✅ Multi-idioma (Español/Inglés)
- ✅ Sin registro requerido
- ✅ Precios configurables en tiempo real
- ✅ Etiquetas configurables ("Porción abundante", "Ideal para compartir")
- ✅ Productos destacados y "Pesca del día"
- ✅ Opciones de producto con precios independientes
- ✅ Panel de administración protegido

## 🏗️ Arquitectura

```
el-macho-qr/
├── backend/          # Spring Boot API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/         # React App
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🚀 Inicio Rápido

### Desarrollo Local

#### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

El backend estará disponible en `http://localhost:8080/api`

#### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### Producción con Docker

```bash
# Crear archivo de variables de entorno
cp .env.example .env
# Editar .env con las credenciales de producción

# Levantar todos los servicios
docker-compose up -d
```

## 📡 API Endpoints

### Públicos (sin autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/menu?lang=es` | Carta completa |
| GET | `/api/v1/menu/categories/{code}?lang=es` | Productos por categoría |
| GET | `/api/v1/menu/products/available?lang=es` | Productos disponibles |
| GET | `/api/v1/menu/featured?lang=es` | Productos destacados |
| GET | `/api/v1/menu/catch-of-day?lang=es` | Pesca del día |

### Administración (requieren autenticación Basic Auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/admin/categories` | Listar categorías |
| POST | `/api/v1/admin/categories` | Crear categoría |
| PUT | `/api/v1/admin/categories/{id}` | Actualizar categoría |
| PATCH | `/api/v1/admin/categories/{id}/toggle-active` | Activar/desactivar |
| GET | `/api/v1/admin/products` | Listar productos |
| POST | `/api/v1/admin/products` | Crear producto |
| PUT | `/api/v1/admin/products/{id}` | Actualizar producto |
| PATCH | `/api/v1/admin/products/{id}/toggle-available` | Disponibilidad |
| PATCH | `/api/v1/admin/products/{id}/toggle-featured` | Destacar producto |
| PATCH | `/api/v1/admin/products/{id}/toggle-catch-of-day` | Pesca del día |
| PATCH | `/api/v1/admin/prices/quick-update` | Actualizar precio |
| PATCH | `/api/v1/admin/prices/bulk-update` | Actualización masiva |

## 📊 Modelo de Datos

### Categorías
- MENU (Menú del Mar)
- PESCADOS
- BAR
- BEBESTIBLES
- MENU_NINO

### Estructura de Precios
```
Producto (sin precio)
└── Opciones (con precio)
    ├── Opción 1: "Para 1 persona" - $14.900
    ├── Opción 2: "Para 2-3 personas" - $26.900
    └── Opción 3: "Fuente para compartir" - $38.900
```

## 🎨 Diseño UX/UI

### Paleta de Colores
- **Primario (Azul Océano):** `#0ea5e9`
- **Secundario (Arena):** `#eab308`
- **Acento (Coral):** `#f97316`

### Tipografía
- **Display:** Poppins (títulos)
- **Body:** Inter (texto)

### Principios de Diseño
- Botones grandes (min 44px)
- Alto contraste
- Scroll natural
- Tarjetas expandibles
- Animaciones suaves (200-300ms)

## 🔐 Seguridad

- Endpoints públicos sin autenticación
- Administración protegida con Basic Auth
- Credenciales configurables via variables de entorno
- CORS habilitado para acceso desde QR

## 📱 Generación de QR

El código QR debe apuntar a:
```
https://tu-dominio.com/?lang=es
```

Parámetros opcionales:
- `lang=es|en` - Idioma
- `cat=MENU|PESCADOS|BAR` - Categoría inicial

## 🛠️ Variables de Entorno

```env
# Base de datos
DB_PASSWORD=your-secure-password

# Administración
ADMIN_PASSWORD=your-admin-password

# Seguridad
JWT_SECRET=your-jwt-secret-key-minimum-256-bits
```

## 📈 Objetivos de Negocio

Este sistema está diseñado para:
1. **Reducir tiempo de decisión** del cliente
2. **Aumentar ticket promedio** destacando productos rentables
3. **Promover ventas de bar** y bebestibles
4. **Comunicar valor** (porciones grandes, ideal para compartir)
5. **Mantener imagen profesional** del restaurante

## 🧪 Testing

```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
npm test
```

## 📄 Licencia

Propiedad de El Macho Restaurant. Todos los derechos reservados.

---

Desarrollado con ❤️ para El Macho 🦐

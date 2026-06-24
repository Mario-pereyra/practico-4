# Cine Reservas — Sistema de Reservas de Cine en Tiempo Real

Este proyecto es una aplicación web completa para la gestión y reserva de entradas de cine, diseñada para el práctico 4 de la materia de **Web II**. Cuenta con una arquitectura desacoplada con un backend robusto en **NestJS** y un frontend interactivo y premium en **React**.

---

## 🚀 Arquitectura y Tecnologías

### Backend (Servicios y API)
- **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
- **Persistencia**: [TypeORM](https://typeorm.io/) con base de datos **PostgreSQL**
- **Autenticación**: [Passport JWT](http://www.passportjs.org/) con tokens de acceso seguros
- **Validación de Datos**: [class-validator](https://github.com/typestack/class-validator) y [class-transformer]
- **Control de Concurrencia**: Bloqueo pesimista (`pessimistic_write`) y transacciones en base de datos para evitar la doble reserva de asientos.

### Frontend (Portal del Cliente e Interfaz)
- **Herramienta de Construcción**: [Vite](https://vite.dev/) con React y TypeScript
- **Enrutamiento**: [React Router](https://reactrouter.com/)
- **Estilos**: CSS modular y moderno (Diseño premium con soporte nativo de modo oscuro, degradados suaves y efectos de Glassmorphism)
- **Iconografía**: [Lucide React](https://lucide.dev/)

---

## 🌟 Características Principales

1. **Cartelera Pública**: Exploración de películas disponibles en cartelera con buscador en tiempo real y filtrado por género.
2. **Detalles y Funciones**: Vista detallada de películas con su sinopsis, duración, clasificación y listado de funciones futuras ordenadas por fecha/hora.
3. **Mapa de Asientos Interactivo**: Selección gráfica de asientos en tiempo real con estados visuales (Disponible, Seleccionado y Reservado).
4. **Reserva Segura**: Confirmación transaccional con control de duplicados y mitigación de colisiones (máximo 20 asientos por transacción).
5. **Historial de Compras**: Listado paginado de las compras anteriores del cliente autenticado.
6. **Ticket Digital**: Tarjeta digital detallada que sirve como comprobante del ticket con desglose de precios y butacas asignadas.
7. **Panel de Administración (Admin)**: Gestión de películas, salas, programación de funciones y monitoreo de reservas.

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker Desktop](https://www.docker.com/) (para levantar la base de datos PostgreSQL)
- [Git](https://git-scm.com/)

---

## ⚙️ Configuración y Puesta en Marcha

### 1. Levantar la Base de Datos (Docker)
El proyecto utiliza una base de datos PostgreSQL parametrizada en Docker. Levántala desde el directorio del proyecto donde se encuentre el archivo `docker-compose.yml` ejecutando:

```bash
docker-compose up -d
```
> [!NOTE]
> Esto iniciará un contenedor llamado `cine-reservas-db` en el puerto `5433` (mapeado internamente al puerto estándar de Postgres `5432`).

### 2. Configurar el Backend
1. Dirígete a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Crea un archivo `.env` en la raíz de `backend/` con las siguientes credenciales de conexión:
   ```env
   DB_HOST=localhost
   DB_PORT=5433
   DB_USERNAME=postgres
   DB_PASSWORD=password123
   DB_DATABASE=cine_reservas
   JWT_SECRET=super-secret-key-12345
   PORT=3000
   ```
3. Instala las dependencias y arranca el servidor de desarrollo:
   ```bash
   npm install
   npm run start:dev
   ```
> [!IMPORTANT]
> Al iniciar el backend por primera vez, TypeORM creará las tablas automáticamente. Un **servicio de seeding** (`SeedService`) detectará la base de datos vacía e insertará automáticamente películas, salas, asientos y usuarios de prueba.

### 3. Configurar el Frontend
1. Dirígete a la carpeta `frontend`:
   ```bash
   cd ../frontend
   ```
2. Instala las dependencias y arranca el servidor de desarrollo en Vite:
   ```bash
   npm install
   npm run dev
   ```
3. La aplicación estará disponible en tu navegador en: **`http://localhost:5173`**

---

## 🔑 Cuentas de Prueba Pre-Cargadas

Puedes probar todas las funcionalidades con los siguientes usuarios generados automáticamente durante el seed:

| Rol | Correo Electrónico | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Cliente** | `client@cinereservas.com` | `client12345` | Explorar cartelera, reservar asientos, ver historial y ticket digital |
| **Administrador** | `admin@cinereservas.com` | `admin12345` | Acceso completo al Panel de Administración |

---

## 🧪 Ejecución de Pruebas Automatizadas

### Backend
Para correr el conjunto de pruebas unitarias del backend (cobertura de controladores, lógica de servicios de reservas y validación de unicidad de asientos):
```bash
cd backend
npm run test
```

### Frontend
Para correr las pruebas de frontend con Vitest:
```bash
cd frontend
npm run test
```

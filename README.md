# Pasa Sin Copiar - Plataforma Integral de Tutorías

Una plataforma completa para gestión de tutorías, cursos y guías descargables con integración de Google Calendar y notificaciones automáticas por correo electrónico.

## 🚀 Características

### Tutorías Personalizadas
- **Agendamiento con Google Calendar**: Sincronización automática de tutorías
- **Verificación de disponibilidad**: Consulta horarios disponibles en tiempo real
- **Confirmaciones automáticas**: Emails de confirmación y recordatorios
- **Gestión de reservas**: Panel administrativo para ver y gestionar todas las reservas

### Catálogo de Cursos
- **Inscripción en línea**: Proceso simple de inscripción a cursos
- **Enlaces de pago automáticos**: Generación y envío de enlaces de pago por email
- **Gestión completa**: CRUD de cursos desde el panel administrativo
- **Seguimiento de inscripciones**: Monitoreo del estado de pagos

### Guías Descargables
- **Vista previa**: Permite ver una muestra antes de comprar
- **Compra y descarga**: Sistema de compra con enlaces de descarga seguros
- **Categorización**: Organización por categorías temáticas
- **Gestión de compras**: Registro completo de transacciones

### Panel Administrativo
- Panel unificado para gestionar todos los aspectos de la plataforma
- Gestión de reservas, cursos, guías e inscripciones
- Visualización de todas las transacciones y actividades

### Notificaciones Automáticas
- Confirmaciones de reservas de tutorías
- Enlaces de pago para inscripciones a cursos
- Enlaces de descarga para guías compradas
- Notificaciones administrativas de todas las actividades

### Diseño Responsive
- Interfaz adaptable a todos los dispositivos
- Diseño moderno y fácil de usar
- Optimizado para móviles, tablets y escritorio

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- Cuenta de Google para la API de Calendar
- Cuenta de Gmail para envío de correos (o cualquier servicio SMTP)

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/juanasaavedra/pasa-sin-copiar.git
   cd pasa-sin-copiar
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   - Copiar el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Editar `.env` con tus credenciales:
     ```
     PORT=3000
     
     # Google Calendar API
     GOOGLE_CLIENT_ID=tu_client_id
     GOOGLE_CLIENT_SECRET=tu_client_secret
     GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
     GOOGLE_REFRESH_TOKEN=tu_refresh_token
     
     # Email Configuration
     EMAIL_USER=tu_email@gmail.com
     EMAIL_PASSWORD=tu_app_password
     
     # Payment Configuration
     PAYMENT_BASE_URL=https://tu-plataforma-de-pago.com/checkout
     
     # Application URL
     APP_URL=http://localhost:3000
     ```

4. **Iniciar el servidor**:
   ```bash
   npm start
   ```

5. **Acceder a la aplicación**:
   - Abrir el navegador en: `http://localhost:3000`

## 🔑 Configuración de Google Calendar API

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un nuevo proyecto
3. Habilitar la API de Google Calendar
4. Crear credenciales OAuth 2.0
5. Descargar las credenciales y configurar en `.env`
6. Obtener el refresh token (ver documentación de Google OAuth2)

## 📧 Configuración de Email

Para Gmail:
1. Activar la autenticación de dos factores
2. Generar una contraseña de aplicación
3. Usar la contraseña de aplicación en `EMAIL_PASSWORD`

## 🗄️ Base de Datos

La aplicación usa SQLite para almacenamiento local. La base de datos se crea automáticamente en `database/tutoring.db` al iniciar el servidor por primera vez.

### Tablas creadas:
- `bookings`: Reservas de tutorías
- `courses`: Catálogo de cursos
- `enrollments`: Inscripciones a cursos
- `guides`: Guías descargables
- `guide_purchases`: Compras de guías
- `availability`: Disponibilidad de tutores

## 📁 Estructura del Proyecto

```
pasa-sin-copiar/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de base de datos
│   ├── controllers/
│   │   ├── bookingController.js # Lógica de reservas
│   │   ├── courseController.js  # Lógica de cursos
│   │   └── guideController.js   # Lógica de guías
│   ├── services/
│   │   ├── googleCalendar.js    # Servicio de Google Calendar
│   │   └── email.js             # Servicio de email
│   ├── routes/
│   │   ├── bookings.js          # Rutas de reservas
│   │   ├── courses.js           # Rutas de cursos
│   │   └── guides.js            # Rutas de guías
│   ├── views/
│   │   ├── index.html           # Página principal
│   │   ├── bookings.html        # Página de reservas
│   │   ├── courses.html         # Página de cursos
│   │   ├── guides.html          # Página de guías
│   │   └── admin.html           # Panel administrativo
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css       # Estilos CSS
│   │   └── js/
│   │       ├── main.js          # JavaScript principal
│   │       ├── bookings.js      # JavaScript de reservas
│   │       ├── courses.js       # JavaScript de cursos
│   │       ├── guides.js        # JavaScript de guías
│   │       └── admin.js         # JavaScript del admin
│   └── server.js                # Servidor Express
├── database/
│   └── tutoring.db              # Base de datos SQLite
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias y scripts
└── README.md                    # Este archivo
```

## 🌐 API Endpoints

### Reservas de Tutorías
- `GET /api/bookings` - Listar todas las reservas
- `GET /api/bookings/availability?date=YYYY-MM-DD` - Ver disponibilidad
- `POST /api/bookings` - Crear nueva reserva
- `DELETE /api/bookings/:id` - Cancelar reserva

### Cursos
- `GET /api/courses` - Listar todos los cursos
- `GET /api/courses/:id` - Obtener curso específico
- `POST /api/courses` - Crear nuevo curso (admin)
- `PUT /api/courses/:id` - Actualizar curso (admin)
- `DELETE /api/courses/:id` - Eliminar curso (admin)
- `POST /api/courses/enroll` - Inscribirse a un curso
- `GET /api/courses/enrollments/all` - Listar inscripciones (admin)

### Guías
- `GET /api/guides` - Listar todas las guías
- `GET /api/guides/:id` - Obtener guía específica
- `GET /api/guides/:id/preview` - Ver vista previa
- `GET /api/guides/:id/download?email=...` - Descargar guía
- `POST /api/guides` - Crear nueva guía (admin)
- `PUT /api/guides/:id` - Actualizar guía (admin)
- `DELETE /api/guides/:id` - Eliminar guía (admin)
- `POST /api/guides/purchase` - Comprar guía
- `GET /api/guides/purchases/all` - Listar compras (admin)

## 🎨 Páginas Web

- **`/`** - Página principal con servicios destacados
- **`/bookings`** - Agendar tutorías y ver disponibilidad
- **`/courses`** - Catálogo de cursos e inscripción
- **`/guides`** - Guías descargables con vista previa
- **`/admin`** - Panel administrativo completo

## 🔒 Seguridad

- Variables de entorno para credenciales sensibles
- Validación de datos en servidor y cliente
- Autenticación OAuth2 para Google Calendar
- Links de descarga verificados por email

## 🚀 Despliegue en Producción

1. Configurar variables de entorno en el servidor
2. Asegurarse de tener Node.js instalado
3. Instalar dependencias: `npm install`
4. Iniciar el servidor: `npm start`

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Soporte

Para soporte o preguntas, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ para Pasa Sin Copiar**

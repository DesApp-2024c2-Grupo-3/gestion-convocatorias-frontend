# 🎯 Sistema de Gestión de Convocatorias

Una aplicación web para la gestión integral de convocatorias de investigación, desarrollada para la Universidad Nacional de Hurlingham.

## 📋 Descripción

Este sistema permite a investigadores, administradores y super administradores gestionar convocatorias de investigación de manera eficiente. Incluye funcionalidades para crearconvocatorias, gestionar postulaciones, administrar usuarios y manejar formatos de proyectos.

## ✨ Características Principales

### 🔐 Autenticación y Autorización
- Sistema de login/registro con roles diferenciados
- Control de acceso basado en roles (investigador, admin, super_admin)
- Gestión de sesiones con JWT
- Recuperación de contraseñas

### 📢 Gestión de Convocatorias
- Crear convocatorias
- Visualizar listado de convocatorias activas
- Modificar fechas de cierre
- Gestión de archivos adjuntos

### 👥 Gestión de Usuarios
- Panel de administración de usuarios (super_admin)
- Perfiles de usuario personalizables

### 📝 Postulaciones y Proyectos
- Sistema de postulación a convocatorias
- Visualización de postulaciones por convocatoria
- Gestión de presupuestos de proyectos
- Formularios dinámicos de inscripción

### 📊 Formatos y Documentos
- Gestión de formatos de proyectos
- Visualización de documentos PDF
- Sistema de plantillas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Material-UI (MUI)** - Componentes de UI
- **React Router** - Enrutamiento
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificaciones
- **Day.js** - Manejo de fechas

### Herramientas de Desarrollo
- **Storybook** - Documentación de componentes
- **ESLint** - Linting de código
- **Sass** - Preprocesador CSS

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd gestion-convocatorias-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_ENV=development
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios de API
│   ├── convocatorias.api.ts
│   ├── usuarios.api.ts
│   ├── proyectos.api.ts
│   └── formatos.api.ts
├── components/             # Componentes reutilizables
│   ├── atoms/              # Componentes básicos
│   ├── molecules/          # Componentes compuestos
│   ├── organisms/          # Componentes complejos
│   └── templates/          # Plantillas de página
├── contexts/               # Contextos de React
│   └── userContext.tsx     # Contexto de usuario
├── hooks/                  # Hooks personalizados
├── pages/                  # Páginas de la aplicación
│   ├── Login/
│   ├── ConvocatoriasPage/
│   ├── PostulacionesPage/
│   └── ...
├── routers/                # Configuración de rutas
├── styles/                 # Estilos globales
└── utils/                  # Utilidades
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia el servidor de desarrollo

# Construcción
npm run build            # Construye para producción
npm run preview          # Vista previa de la build

# Linting
npm run lint             # Ejecuta ESLint

# Storybook
npm run storybook        # Inicia Storybook
npm run build-storybook  # Construye Storybook
```

## 👥 Roles de Usuario

### 🔬 Investigador
- Ver convocatorias disponibles
- Postularse a convocatorias
- Gestionar perfil personal

### 👨‍💼 Admin
- Gestionar convocatorias
- Ver postulaciones por convocatoria
- Gestionar formatos
- Ver presupuestos

### 👑 Super Admin
- Editar Roles de usuarios

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

- Los tokens se almacenan en `sessionStorage`
- Se incluyen automáticamente en las cabeceras de las peticiones API
- El contexto de usuario maneja el estado de autenticación globalmente

## 📱 Responsive Design

La aplicación está diseñada para funcionar en:
- 📱 Dispositivos móviles
- 🖥️ Escritorio

## 🧪 Testing y Calidad

- **Storybook**: Documentación interactiva de componentes
- **ESLint**: Análisis estático de código
- **TypeScript**: Verificación de tipos en tiempo de compilación

## 🚀 Despliegue

### Producción
```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist/` listos para ser desplegados en cualquier servidor web estático.

### Variables de Entorno de Producción
```env
VITE_API_URL=https://api.tudominio.com
VITE_ENV=production
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 👨‍💻 Desarrollado por

**Universidad Nacional de Hurlingham**  
Sistema de Gestión de Convocatorias de Investigación

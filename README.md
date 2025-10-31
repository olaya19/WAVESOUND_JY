# 🎵🌊 WaveSound: Plataforma de Música y Gestión de Derechos de Autor

Este repositorio contiene el código fuente de una plataforma web que integra streaming musical, interracion social y gestión de derechos de autor.
El sistema sigue una arquitectura API REST con separación de responsabilidades entre frontend, backend y base de datos, lo que garantiza escalabilidad, mantenibilidad y modularidad.

---

## 📂 Estructura General del Proyecto

WAVESOUND_JY/
│
├── backend/                     # Servidor backend en Python (FastAPI)
│   ├── app_wavesound/           # Núcleo principal del backend
│   │   ├── controllers/         # Controladores: lógica de negocio de cada módulo
│   │   ├── db/                  # Conexión y configuración de la base de datos
│   │   ├── models/              # Modelos ORM (estructuras de las tablas)
│   │   ├── routes/              # Endpoints y rutas de la API REST
│   │   ├── schemas/             # Validaciones y serialización de datos (Pydantic)
│   │   └── __init__.py          # Inicialización del paquete
│   │
│   ├── mi_entorno/              # Configuraciones del entorno local o de desarrollo
│   ├── tests/                   # Pruebas unitarias y de integración
│   ├── create_tables.py         # Script para crear tablas en la base de datos
│   ├── main.py                  # Punto de entrada del servidor
│   └── requirements.txt         # Dependencias y librerías necesarias del backend
│
├── database/                    # Archivos SQL y de administración de la base de datos
│   └── .gitkeep                 # Mantiene la carpeta en el repositorio
│
├── documentancion/              # Documentación técnica y guías del proyecto
│   ├── Git_Workflow.md          # Flujo de trabajo con Git y ramas
│   ├── Guia_Estandares.md       # Convenciones y estándares de código
│   └── otros_archivos.md        # Diagramas, manuales o especificaciones técnicas
│
├── frontend/                    # Interfaz del usuario (React + Vite)
│   ├── public/                  # Archivos públicos estáticos
│   ├── src/                     # Código fuente principal del frontend
│   │   ├── assets/              # Imágenes, íconos y recursos estáticos
│   │   ├── components/          # Componentes reutilizables de la interfaz
│   │   ├── ESTILOS/             # Archivos CSS personalizados del proyecto
│   │   ├── pages/               # Páginas principales (Login, Home, Perfil, etc.)
│   │   ├── services/            # Conexiones con la API backend (fetch/axios)
│   │   ├── App.jsx              # Componente raíz del frontend
│   │   ├── main.jsx             # Punto de entrada de la aplicación
│   │   ├── App.css              # Estilos del componente principal
│   │   └── index.css            # Estilos globales
│   │
│   ├── eslint.config.js         # Reglas y convenciones de estilo de código
│   ├── index.html               # Archivo base de la app web
│   ├── package.json             # Dependencias y scripts de npm
│   ├── package-lock.json        # Bloqueo de dependencias instaladas
│   └── vite.config.js           # Configuración del entorno Vite
│
└── README.md                    # Documentación principal del proyecto

---

## 🧠 Descripción de Módulos

### **🖥️ Backend**
Desarrollado en Python con FastAPI, bajo una arquitectura REST y modular que facilita la escalabilidad y el mantenimiento.

- **controllers**: Contiene la lógica de negocio y procesamiento de datos.
- **db**: Configuración y conexión con la base de datos.
- **models**: Modelos ORM que representan las tablas y relaciones.
- **routes**: Endpoints REST que comunican el frontend con el backend.
- **schemas**: Validación y serialización de datos mediante Pydantic.
- **tests**: Scripts para pruebas automatizadas.
- **main.py**: Punto de entrada del servidor FastAPI.
- **requirements.txt**: Dependencias principales (FastAPI, SQLAlchemy, Pydantic, FPDF, etc).
---

### **🎨 Frontend**
Construido con React + Vite, responsable de la interfaz gráfica y la interacción del usuario con la plataforma.

- **components**: Elementos reutilizables (botones, menús, formularios, etc.).
- **pages**: Páginas principales de la aplicación (Inicio, Perfil, Derechos de Autor, Subida de Canciones, etc.).
- **services**: Comunicación con la API del backend usando Axios o Fetch.
- **ESTILOS**: Hojas CSS personalizadas para el diseño visual.
- **assets**: Imágenes, íconos y recursos estáticos.
- **App.jsx / main.jsx**: Estructura base y punto de inicio de la app.
---

### **🗄️ Database**
Contiene los scripts SQL para la creación, relaciones y carga inicial de la base de datos que soporta los módulos de usuarios, música, derechos de autor e interacción social.

- **schema.sql**: Definición de tablas, relaciones e índices.
- **seeds.sql**: Datos iniciales para pruebas.

---

### **📘 Documentancion**
Incluye la documentación técnica del proyecto, guías internas, estándares de código y flujo de trabajo colaborativo con Git.

---

## 🚀 Instalación y Configuración

### **1️⃣ Clonar el repositorio**
```bash
git clone <url-del-repo>
cd WAVESOUND_JY

# WaveSound: Plataforma de Música y Gestión de Derechos de Autor

¡Bienvenido al proyecto WaveSound!  
Este repositorio contiene el código fuente para una aplicación web que combina música en streaming, tienda online y gestión de derechos de autor.  
La arquitectura del proyecto está diseñada bajo un esquema **API REST** para garantizar escalabilidad, mantenibilidad y separación clara entre frontend, backend y base de datos.

---

## 📂 Estructura del Proyecto
WAVESOUND_JY/
│
├── backend/ # Backend en Python (Flask)
│ ├── app-wavesound/ # Código principal del backend
│ │ ├── controllers/ # Lógica de negocio
│ │ ├── db/ # Configuración y conexión a la BD
│ │ ├── models/ # Modelos de la base de datos (ORM)
│ │ ├── routes/ # Rutas de la API REST
│ │ └── schemas/ # Validaciones y serialización de datos
│ ├── main.py # Punto de entrada del servidor Flask
│ └── requirements.txt # Dependencias de Python
│
├── database/ # Scripts SQL y archivos de base de datos
│ └── .gitkeep # Mantiene carpeta vacía en el repositorio
│
├── documentancion/ # Documentación interna del proyecto
│ ├── Git_Workflow.md # Flujo de trabajo con Git
│ └── Guia_Estandares.md # Estándares de código y buenas prácticas
│
├── frontend/ # Frontend en React + Vite
│ ├── public/ # Archivos estáticos públicos
│ │ └── vite.svg
│ ├── src/ # Código fuente React
│ │ ├── assets/ # Imágenes y recursos
│ │ ├── App.css # Estilos del componente raíz
│ │ ├── App.jsx # Componente raíz
│ │ ├── index.css # Estilos globales
│ │ └── main.jsx # Punto de entrada de la app
│ ├── eslint.config.js # Configuración de ESLint
│ ├── index.html # HTML base
│ ├── package.json # Dependencias y scripts de frontend
│ ├── package-lock.json # Bloqueo de dependencias
│ └── vite.config.js # Configuración de Vite
│
└── README.md # Este archivo (guía principal del proyecto)



---

## 🛠 Descripción de Componentes

### **backend/**
Servidor en **Python con Flask**. Contiene la API REST que conecta con la base de datos y expone los datos al frontend.

- **routes/**: Endpoints de la API.
- **controllers/**: Lógica de negocio que procesa datos.
- **models/**: Modelos de la base de datos (ORM).
- **schemas/**: Validaciones y serialización de datos.
- **db/**: Configuración de conexión a la base de datos.
- **main.py**: Arranque del servidor Flask.
- **requirements.txt**: Lista de dependencias de Python.

---

### **frontend/**
Aplicación en **React + Vite** que consume la API del backend.

- **assets/**: Recursos gráficos y estáticos.
- **App.jsx**: Componente principal de React.
- **main.jsx**: Punto de entrada de la aplicación.
- **index.css / App.css**: Estilos globales y del componente raíz.
- **public/**: Archivos estáticos visibles públicamente.

---

### **database/**
Scripts SQL para crear y poblar la base de datos.

- **schema.sql**: Definición de tablas, relaciones e índices.
- **seeds.sql**: Datos iniciales para pruebas.

---

### **documentancion/**
Documentación interna del proyecto: guías, flujos de trabajo, estándares y diagramas.

---

## 🚀 Instalación y Configuración

### **1️⃣ Clonar el repositorio**
```bash
git clone <url-del-repo>
cd WAVESOUND_JY

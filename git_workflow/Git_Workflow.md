## Git_Workflow.md 

## Flujo de trabajo con Git
## 1. Estructura de ramas
Utilizamos un flujo de trabajo Git Flow simplificado con las siguientes ramas principales:

main: Rama principal, siempre contiene una versión estable lista para producción.

develop: Rama base para integrar nuevas funcionalidades antes de pasar a main.

feature/*: Ramas individuales creadas a partir de develop para desarrollar funcionalidades específicas.

Ejemplos de ramas feature utilizadas:

feature/*

## 2.  Convención de commits
Usamos una convención clara para mantener un historial limpio y entendible. Formato:

[tipo]: Descripción breve en infinitivo
 
Tipos de commit permitidos:

feat: nueva funcionalidad (feat: crear formulario de registro)

fix: corrección de errores (fix: validar campos vacíos en login)

docs: cambios en la documentación (docs: actualizar README)

style: cambios de estilo (espacios, formato, etc.)

refactor: cambios de código que no agregan funcionalidad ni corrigen bugs

test: agregar o modificar pruebas

## 3. Frecuencia de push y pull
Push: Cada vez que se finalice una tarea parcial o completa en la rama correspondiente.

Pull: Antes de comenzar a trabajar y antes de hacer push, para evitar conflictos y mantener el repositorio sincronizado.

## 4.  Política de Pull Requests (PR)
Las ramas feature/* deben ser fusionadas a develop a través de un Pull Request (PR).

Los PR deben incluir:

Descripción clara de los cambios.

Enlace a la tarea relacionada (si aplica).

Al menos una revisión antes de hacer merge (si hay más de un colaborador).

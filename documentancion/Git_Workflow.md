# Git Workflow - WaveSound

## 1. Flujo de ramas
- **main:** Código estable, listo para producción.
- **develop:** Rama de integración de funcionalidades.
- **feature/*:** Una por funcionalidad específica (ejemplo: feature/backend-setup).

## 2. Convención de commits
- **feat:** Nueva funcionalidad → `git commit -m "feat: agregar login de usuarios"`
- **fix:** Corrección de errores → `git commit -m "fix: corregir validación de email"`
- **docs:** Documentación → `git commit -m "docs: actualizar README"`
- **style:** Cambios de estilo / formato → `git commit -m "style: formatear código con Black/Prettier"`
- **refactor:** Refactorización de código → `git commit -m "refactor: optimizar función de login"`

## 3. Frecuencia de push/pull
- Hacer **push** después de terminar un bloque de funcionalidad pequeña o mediana.
- Hacer **pull** antes de iniciar trabajo diario para mantener ramas actualizadas.

## 4. Política de Pull Requests
1. Crear PR desde `feature/*` hacia `develop`.
2. Revisar cambios y resolver conflictos antes de aprobar.
3. Merge solo si:
   - Linters pasan (Black para Python, ESLint/Prettier para JS).
   - Código cumple estándares de `Guia_EstandaresCodigo.md`.
4. Después de mergear a develop, hacer merge de develop a main solo si está estable.

---

## 5. Plantilla de PR (opcional)
**Título:** `feat: nombre breve de la funcionalidad`  
**Descripción:**
- Qué hace la funcionalidad.
- Cómo probarla.
- Checklist:
  - [ ] Código formateado
  - [ ] Pruebas básicas pasadas
  - [ ] Documentación actualizada


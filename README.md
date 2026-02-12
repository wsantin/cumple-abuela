# 🎂 Cumpleaños de MIMI - Organizador Familiar

Sistema web para organizar el cumpleaños de la abuela MIMI con colaboración familiar en tiempo real.

## ✨ Características

- 👨‍👩‍👧‍👦 **Gestión de familias**: Registra todas las familias y sus miembros asistentes
- 🎁 **Aportes colaborativos**: Coordina contribuciones económicas y en especie (comida, bebidas, decoración, etc.)
- ✅ **Confirmaciones**: Sistema de confirmación de asistencia por familia
- 📊 **Reportes en tiempo real**: Vista consolidada de asistentes, aportes y estado
- 💾 **Sincronización automática**: Datos guardados en Google Sheets con auto-save
- 📱 **Responsive**: Funciona perfecto en móvil, tablet y desktop
- 🎨 **Interfaz amigable**: Diseño colorido y fácil de usar para toda la familia

## 🌐 Demo en Vivo

👉 **[Abrir Aplicación](https://whsantin.github.io/cumple-mimi-organizer/)**

## 🛠️ Tecnologías

- **Frontend**: React (CDN) + HTML5 + CSS3
- **Backend**: Google Apps Script (API REST)
- **Base de Datos**: Google Sheets
- **Hosting**: GitHub Pages
- **Sincronización**: Fetch API con debouncing

## 📋 Pre-requisitos

Para configurar tu propia versión necesitas:

- ✅ Cuenta de Google (para Google Sheets)
- ✅ Cuenta de GitHub (para hosting)
- ✅ Navegador web moderno

## 🚀 Instalación y Configuración

Ver [SETUP.md](./SETUP.md) para instrucciones detalladas paso a paso.

### Resumen rápido:

1. **Crear Google Sheet** con 3 tabs: Families, Members, Family_Data
2. **Copiar código** de `Code.gs` a Google Apps Script
3. **Desplegar** Web App con acceso público
4. **Actualizar** `GOOGLE_SCRIPT_URL` en `index.html` con tu deployment URL
5. **Push a GitHub** y activar GitHub Pages

## 📂 Estructura del Proyecto

```
cumple-mimi-organizer/
├── index.html          # Aplicación principal (single-file)
├── Code.gs             # Google Apps Script (copiar a Google Sheets)
├── README.md           # Este archivo
├── SETUP.md            # Guía detallada de configuración
└── .gitignore          # Archivos ignorados por git
```

## 🎯 Uso

### Para la familia (usuarios finales):

1. **Abre el link** que te compartieron
2. **Busca tu familia** en la lista
3. **Toca/Click** en el nombre de tu familia para expandir
4. **Agrega asistentes** (nombres de quienes van)
5. **Registra aportes** (dinero, comida, etc.)
6. **Confirma asistencia** cuando esté todo listo
7. Los cambios se **guardan automáticamente** ✨

### Para el administrador:

- **Tab "Familias"**: Gestiona familias, asistentes y aportes
- **Tab "Reporte"**: Ve resumen consolidado y pendientes
- **Agregar familia**: Botón ➕ para nuevas familias
- **Google Sheet**: Accede directamente al sheet para ver/editar datos raw

## 🔧 Configuración Avanzada

### Cambiar datos del evento

Edita en `index.html` línea ~127:

```javascript
const eventConfig = {
  grandmaName: "MIMI",
  eventDate: "20/02/2026",
  location: "Campestre"
};
```

### Personalizar familias iniciales

Edita `INITIAL_FAMILIES` en `index.html` línea ~89

### Modo Offline/Local

Si no configuras `GOOGLE_SCRIPT_URL`, la app funciona en modo local usando `localStorage`

## 📊 Estructura de Google Sheets

### Tab "Families"
| id | name | color | emoji |
|----|------|-------|-------|
| gustavo | Gustavo | #2B9E8F | 🌿 |

### Tab "Members"
| family_id | member_id | member_name |
|-----------|-----------|-------------|
| gustavo | 123456 | Juan |

### Tab "Family_Data"
| family_id | money | food | drinks | ... | confirmed | notes |
|-----------|-------|------|--------|-----|-----------|-------|
| gustavo | 50 | Pollo | Coca | ... | TRUE | ... |

## 🤝 Contribuir

¿Mejoras o sugerencias?

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Problemas Comunes

### "Error al cargar los datos"
- Verifica que `GOOGLE_SCRIPT_URL` esté correcto
- Confirma que el Web App esté desplegado con acceso "Anyone"
- Revisa la consola del navegador (F12) para detalles

### Los datos no se guardan
- Abre DevTools (F12) → Console para ver errores
- Verifica que el Google Apps Script esté funcionando
- Revisa los logs en Apps Script (View → Logs)

### Múltiples usuarios editan simultáneamente
- Sistema usa "last-write-wins" (último gana)
- Coordina ediciones entre familias si es posible
- Usa version history de Google Sheets para recuperar datos

Ver [SETUP.md](./SETUP.md) sección "Troubleshooting" para más ayuda.

## 📄 Licencia

Este proyecto es de código abierto. Úsalo y modifícalo libremente para tus eventos familiares.

## 💝 Créditos

Creado con ❤️ para organizar el cumpleaños de la abuela MIMI y reunir a toda la familia.

---

**¿Preguntas?** Abre un [Issue](../../issues) en GitHub

**Versión**: 1.0.0
**Última actualización**: Febrero 2026

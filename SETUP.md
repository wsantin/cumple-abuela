# 🚀 Guía de Configuración Completa

Esta guía te llevará paso a paso para configurar tu propia versión del organizador de cumpleaños con Google Sheets y GitHub Pages.

**Tiempo estimado**: 30-45 minutos
**Nivel**: Principiante (no requiere programación)

---

## 📑 Tabla de Contenidos

1. [Requisitos Previos](#-requisitos-previos)
2. [Parte 1: Configurar Google Sheets](#-parte-1-configurar-google-sheets)
3. [Parte 2: Configurar Google Apps Script](#-parte-2-configurar-google-apps-script)
4. [Parte 3: Actualizar index.html](#-parte-3-actualizar-indexhtml)
5. [Parte 4: Subir a GitHub](#-parte-4-subir-a-github)
6. [Parte 5: Activar GitHub Pages](#-parte-5-activar-github-pages)
7. [Parte 6: Probar Todo](#-parte-6-probar-todo)
8. [Troubleshooting](#-troubleshooting)
9. [Preguntas Frecuentes](#-preguntas-frecuentes)

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener:

- [ ] **Cuenta de Google** (Gmail) - [Crear una aquí](https://accounts.google.com/signup)
- [ ] **Cuenta de GitHub** - [Crear una aquí](https://github.com/signup)
- [ ] **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- [ ] **Conocimientos básicos** de copiar/pegar y navegar archivos

---

## 📊 Parte 1: Configurar Google Sheets

### Paso 1.1: Crear nuevo Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Click en **"Blank"** (En blanco) o ➕ para crear nueva hoja
3. En la parte superior, renombra como: **"Cumple MIMI Organizer"**

### Paso 1.2: Crear tab "Families"

1. En la parte inferior, verás una tab llamada "Sheet1"
2. Haz **doble click** en "Sheet1" y renómbrala como: **Families**
3. En la **fila 1** (headers), escribe:
   - Celda **A1**: `id`
   - Celda **B1**: `name`
   - Celda **C1**: `color`
   - Celda **D1**: `emoji`

### Paso 1.3: Crear tab "Members"

1. Click en el botón **➕** junto a las tabs (abajo a la izquierda)
2. Renombra la nueva tab como: **Members**
3. En la **fila 1** escribe:
   - Celda **A1**: `family_id`
   - Celda **B1**: `member_id`
   - Celda **C1**: `member_name`

### Paso 1.4: Crear tab "Family_Data"

1. Click en **➕** nuevamente para crear otra tab
2. Renombra como: **Family_Data**
3. En la **fila 1** escribe:
   - **A1**: `family_id`
   - **B1**: `money`
   - **C1**: `food`
   - **D1**: `drinks`
   - **E1**: `snacks`
   - **F1**: `dessert`
   - **G1**: `decoration`
   - **H1**: `transport`
   - **I1**: `other`
   - **J1**: `confirmed`
   - **K1**: `notes`

### ✅ Checkpoint 1

Deberías tener:
- ✅ Un Google Sheet llamado "Cumple MIMI Organizer"
- ✅ 3 tabs: Families, Members, Family_Data
- ✅ Cada tab con sus headers en la fila 1

---

## 🔧 Parte 2: Configurar Google Apps Script

### Paso 2.1: Abrir Apps Script Editor

1. En tu Google Sheet, click en **Extensions** (Extensiones) en el menú superior
2. Click en **Apps Script**
3. Se abrirá una nueva pestaña con el editor de código

### Paso 2.2: Copiar el código

1. En el editor, verás un archivo llamado `Code.gs` con código default
2. **Selecciona TODO** el código default y **bórralo**
3. Abre el archivo `Code.gs` de este repositorio
4. **Copia TODO** el contenido
5. **Pega** en el editor de Apps Script

### Paso 2.3: Guardar el proyecto

1. Click en el icono **💾** (diskette) o presiona `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. Si es la primera vez, te pedirá un nombre de proyecto
3. Escribe: **"Cumple API"**
4. Click **OK**

### Paso 2.4: Probar el código (opcional pero recomendado)

1. En el dropdown de funciones (arriba del código), selecciona: **`initializeSheets`**
2. Click en **▶ Run** (Ejecutar)
3. La primera vez te pedirá autorización:
   - Click **Review Permissions**
   - Selecciona tu cuenta de Google
   - Click **Advanced** (Avanzado)
   - Click **Go to Cumple API (unsafe)** - Es seguro, es tu código
   - Click **Allow** (Permitir)
4. Espera a que termine (verás "Execution completed" abajo)
5. Vuelve a tu Google Sheet y verifica que los headers siguen ahí

### Paso 2.5: Desplegar como Web App

1. En Apps Script editor, click en **Deploy** (Desplegar) → **New deployment** (Nuevo despliegue)
2. Click en el icono de engranaje ⚙️ junto a "Select type"
3. Selecciona **Web app**
4. Configura así:
   - **Description**: `v1.0` (o la versión que quieras)
   - **Execute as**: **Me** (tu email)
   - **Who has access**: **Anyone** ⚠️ MUY IMPORTANTE - debe ser "Anyone"
5. Click **Deploy**
6. Si te pide autorización otra vez, repite el proceso del paso 2.4
7. **¡IMPORTANTE!** Aparecerá una ventana con tu **Web App URL**
8. **COPIA** esa URL completa (algo como: `https://script.google.com/macros/s/ABC123.../exec`)
9. **GUÁRDALA** en un lugar seguro (Notepad, notas, etc.)

### ✅ Checkpoint 2

Deberías tener:
- ✅ Código de Apps Script pegado y guardado
- ✅ Web App desplegado con acceso "Anyone"
- ✅ URL del Web App copiada y guardada

---

## 📝 Parte 3: Actualizar index.html

### Paso 3.1: Abrir index.html

1. En tu computadora, navega a donde clonaste/descargaste este repo
2. Abre `index.html` con un **editor de texto** (Notepad, VS Code, Sublime, etc.)
   - ⚠️ **NO** abras con Word o software de office

### Paso 3.2: Reemplazar la URL

1. Busca la línea ~40 que dice:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_DEPLOYMENT_URL_HERE';
   ```

2. **Reemplaza** `YOUR_GOOGLE_SCRIPT_DEPLOYMENT_URL_HERE` con tu URL del paso 2.5

3. Debería quedar algo así:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw.../exec';
   ```

### Paso 3.3: Guardar los cambios

1. **Guarda** el archivo (`Ctrl+S` / `Cmd+S`)
2. **Cierra** el editor

### ✅ Checkpoint 3

Deberías tener:
- ✅ `index.html` actualizado con tu URL de Google Script
- ✅ Archivo guardado

---

## 🐙 Parte 4: Subir a GitHub

### Paso 4.1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Click en **➕** (arriba derecha) → **New repository**
3. Configura:
   - **Repository name**: `cumple-mimi-organizer` (o el nombre que prefieras)
   - **Description**: "Birthday party organizer with Google Sheets backend"
   - **Public** ✅ (debe ser público para GitHub Pages gratis)
   - **NO** marques "Add a README" (ya tienes uno)
4. Click **Create repository**

### Paso 4.2: Conectar tu repositorio local

**Si ya tienes el repo clonado:**

1. Abre la terminal/command prompt en la carpeta del proyecto
2. Si ya tienes git remoto configurado, salta al paso 4.3

**Si descargaste como ZIP o es nuevo:**

1. Abre terminal en la carpeta del proyecto
2. Ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Birthday organizer with Google Sheets backend"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/cumple-mimi-organizer.git
   ```
   ⚠️ Reemplaza `TU_USUARIO` con tu username de GitHub

### Paso 4.3: Push a GitHub

1. En la terminal, ejecuta:
   ```bash
   git add .
   git commit -m "Configure Google Sheets integration"
   git push -u origin main
   ```

2. Si te pide autenticación:
   - Username: tu usuario de GitHub
   - Password: **Personal Access Token** (no tu contraseña)
   - [Crear token aquí](https://github.com/settings/tokens)

### ✅ Checkpoint 4

Deberías tener:
- ✅ Repositorio creado en GitHub
- ✅ Código pusheado (subido) a GitHub
- ✅ Al abrir tu repo en GitHub, ves los archivos

---

## 🌐 Parte 5: Activar GitHub Pages

### Paso 5.1: Configurar Pages

1. En tu repositorio de GitHub, click en **Settings** (⚙️)
2. En el menú izquierdo, busca y click en **Pages**
3. En la sección **"Source"**:
   - Branch: selecciona **`main`**
   - Folder: selecciona **`/ (root)`**
4. Click **Save**

### Paso 5.2: Esperar el deployment

1. GitHub mostrará un mensaje: "GitHub Pages is currently being built..."
2. Espera **1-2 minutos**
3. **Recarga** la página de Settings → Pages
4. Deberías ver un mensaje verde: **"Your site is published at..."**
5. La URL será algo como: `https://TU_USUARIO.github.io/cumple-mimi-organizer/`

### Paso 5.3: Copiar tu URL pública

1. **Copia** la URL que GitHub te da
2. **Guárdala** - esta es la URL que compartirás con tu familia

### ✅ Checkpoint 5

Deberías tener:
- ✅ GitHub Pages activado
- ✅ Sitio desplegado
- ✅ URL pública copiada

---

## ✅ Parte 6: Probar Todo

### Paso 6.1: Abrir tu sitio

1. Abre la URL de GitHub Pages en tu navegador
2. Deberías ver el mensaje "Cargando datos..." por unos segundos
3. Luego aparecerán las familias

### Paso 6.2: Probar funcionalidades

1. **Click** en una familia para expandir
2. **Agrega** un miembro de prueba
3. **Espera** 2 segundos
4. **Abre** tu Google Sheet
5. **Verifica** que el miembro aparezca en la tab "Members" ✅

### Paso 6.3: Probar contribuciones

1. En una familia, agrega un aporte económico (ej: 50)
2. Agrega una contribución de comida (ej: "Pizza")
3. Marca la familia como confirmada
4. **Verifica** en Google Sheet tab "Family_Data" que se guardó

### Paso 6.4: Probar reporte

1. Click en tab **"📊 Reporte"**
2. Verifica que muestre los datos correctos
3. Verifica el resumen de aportes

### Paso 6.5: Probar multi-dispositivo

1. Abre la misma URL en tu móvil
2. Haz un cambio en móvil
3. Recarga en desktop → debería aparecer el cambio

### ✅ Checkpoint Final

Deberías tener:
- ✅ Sitio funcionando en tu URL de GitHub Pages
- ✅ Datos guardándose en Google Sheets
- ✅ Sincronización funcionando
- ✅ Todo listo para compartir con la familia

---

## 🎉 ¡Listo para usar!

Ahora puedes:

1. **Compartir** la URL de GitHub Pages con tu familia
2. **Personalizar** los datos del evento en `index.html` (nombre, fecha, lugar)
3. **Agregar** más familias directamente desde la web
4. **Monitorear** todo desde Google Sheets

---

## 🐛 Troubleshooting

### Problema: "Error al cargar los datos"

**Causas posibles:**

1. **URL de Google Script incorrecta**
   - Verifica que copiaste la URL completa del paso 2.5
   - Debe terminar en `/exec`, NO en `/dev`
   - Revisa que no haya espacios extra

2. **Permisos de Web App**
   - Ve a Apps Script → Deploy → Manage deployments
   - Verifica que "Who has access" esté en "Anyone"
   - Si no, edita el deployment y cámbialo

3. **Google Script no desplegado**
   - Revisa que hiciste "Deploy" no solo "Save"
   - Debe existir un deployment activo

**Solución:**
1. Abre DevTools (F12) → Console
2. Busca errores en rojo
3. Copia el error y busca en Google o pregunta

---

### Problema: "Los datos no se guardan"

**Causas posibles:**

1. **CORS / Modo no-cors**
   - Es normal que no veas errores en console
   - El modo `no-cors` no muestra errores

2. **Apps Script crasheando**
   - Ve a Apps Script → View → Logs
   - Ve a Apps Script → Executions
   - Busca errores en las últimas ejecuciones

3. **Sheets con nombre incorrecto**
   - Verifica que las tabs se llamen exactamente: `Families`, `Members`, `Family_Data`
   - Mayúsculas/minúsculas importan

**Solución:**
1. Abre Google Sheet y verifica tabs
2. Ejecuta manualmente `testSaveData()` desde Apps Script
3. Revisa si aparecen datos de prueba en el sheet

---

### Problema: "GitHub Pages muestra 404"

**Causas posibles:**

1. **GitHub Pages no activado correctamente**
2. **Branch incorrecto seleccionado**
3. **Deployment en progreso**

**Solución:**
1. Ve a Settings → Pages
2. Verifica que branch sea `main` y folder sea `/ (root)`
3. Click "Save" de nuevo
4. Espera 2-3 minutos
5. Limpia caché del navegador (Ctrl+Shift+R)

---

### Problema: "Cambios no aparecen en GitHub Pages"

**Causas:**

1. **Caché del navegador**
2. **Deployment no terminó**
3. **No hiciste push**

**Solución:**
1. Verifica en GitHub que tus cambios estén ahí
2. Espera 1-2 minutos para re-deployment
3. Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
4. Prueba en ventana incógnito

---

### Problema: "Dos personas editan y se pierde data"

**Explicación:**

El sistema usa "last-write-wins" (el último gana). No hay conflict resolution automático.

**Soluciones:**

1. **Coordina ediciones**: Cada familia edita solo su info
2. **Usa Google Sheet directamente**: Para ver/recuperar data perdida
3. **Version History**: Sheet → File → Version history → ver versiones anteriores

---

## ❓ Preguntas Frecuentes

### ¿Puedo cambiar el nombre del evento?

Sí, edita en `index.html` línea ~127:

```javascript
const eventConfig = {
  grandmaName: "MIMI",     // Cambia aquí
  eventDate: "20/02/2026", // Cambia aquí
  location: "Campestre"    // Cambia aquí
};
```

Luego haz commit y push.

---

### ¿Puedo cambiar las familias iniciales?

Sí, edita `INITIAL_FAMILIES` en `index.html` línea ~89. O agrégalas desde la web.

---

### ¿Puedo cambiar los tipos de aportes?

Sí, edita `CONTRIBUTION_TYPES` en `index.html` línea ~102. Luego actualiza también la tab "Family_Data" en Google Sheet.

---

### ¿Cómo agrego un dominio personalizado?

1. Compra un dominio (ej: namecheap.com, godaddy.com)
2. En Settings → Pages → Custom domain
3. Agrega tu dominio (ej: `cumple-mimi.com`)
4. Configura DNS en tu registrador:
   - Type: `A`
   - Name: `@`
   - Value: `185.199.108.153` (y otros 3 IPs de GitHub)
   - [Guía completa aquí](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

### ¿Puedo exportar los datos?

Sí, desde Google Sheet:
- File → Download → Excel (.xlsx)
- File → Download → CSV

---

### ¿Cuántas personas/familias soporta?

- **Recomendado**: hasta 50 familias, 200 personas
- **Límite técnico**: miles, pero puede volverse lento
- Google Sheets soporta 10 millones de celdas

---

### ¿Funciona offline?

Parcialmente:
- **Con internet**: Se sincroniza con Google Sheets
- **Sin internet**: Muestra error pero permite usar datos en caché
- No se recomienda editar offline (cambios se pueden perder)

---

### ¿Es gratis?

Sí, 100% gratis:
- ✅ Google Sheets: gratis
- ✅ Google Apps Script: gratis (hasta 20,000 llamadas/día)
- ✅ GitHub Pages: gratis para repos públicos

---

### ¿Mis datos están seguros?

- **Privacidad**: El Web App es público, cualquiera con el link puede ver/editar
- **Seguridad**: Los datos están en tu Google Sheet (tu cuenta)
- **Backup**: Google Sheets tiene version history automático
- **Recomendación**: Comparte el link solo con familia de confianza

---

### ¿Cómo actualizo el código en el futuro?

1. Haz cambios en tus archivos locales
2. `git add .`
3. `git commit -m "Descripción del cambio"`
4. `git push origin main`
5. GitHub Pages se actualiza automáticamente en 1-2 minutos

---

## 📞 Soporte

¿Problemas que no están aquí?

1. **Revisa los logs**:
   - DevTools Console (F12 en navegador)
   - Apps Script → Executions

2. **Busca en Google**:
   - Copia el mensaje de error exacto
   - Busca: "Google Apps Script [tu error]"

3. **Abre un Issue**:
   - Ve a GitHub → tu repo → Issues → New Issue
   - Describe el problema con capturas

---

## 🎓 Recursos Útiles

- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [React Docs](https://react.dev)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

---

**¡Disfruta organizando el cumpleaños!** 🎂🎉

Si esta guía te ayudó, considera darle una ⭐ al repositorio en GitHub.

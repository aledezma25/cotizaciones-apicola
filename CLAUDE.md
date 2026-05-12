# CLAUDE.md

## Objetivo del proyecto

Construir una aplicación web estática en HTML, CSS y JavaScript para generar cotizaciones editables, inspirada visualmente en el diseño adjunto.

La aplicación debe poder desplegarse fácilmente en GitHub Pages sin backend.

El diseño debe ser limpio, profesional y responsive, manteniendo una apariencia similar al formato clásico de cotización empresarial.

---

# Requerimientos funcionales

## Información general de la cotización

Debe incluir campos editables para:

- Logo de la empresa (C:\Users\chami\Desktop\Proyecto\img\logo.png)
- Nombre de la empresa (Apicola la Estancia)
- Eslogan
- Fecha
- Número de factura/cotización
- Información del cliente:
  - Nombre
  - NIT (Antes ID Cliente)
  - Dirección
  - Ciudad
  - Teléfono
- Información del vendedor (Campos Fijos):
  - Nombre: Diego Fernando Urbano
  - NIT: 1088975676-3
  - Celular: 3125763407
- Condiciones de pago
- Fecha de vencimiento

Todos los campos deben ser editables directamente desde la interfaz.

---

# Tabla dinámica de productos

La tabla principal debe permitir:

## Columnas

- Cantidad
- Descripción
- Precio unitario
- Total de línea

---

## Funcionalidades

### Agregar productos

Debe existir un botón:

```html
+ Agregar producto
```

Que permita añadir nuevas filas dinámicamente.

---

### Eliminar productos

Cada fila debe tener un botón para eliminarla.

---

### Cálculo automático

El sistema debe calcular automáticamente:

## Total por línea

```text
cantidad * precio_unitario
```

---

## Subtotal

Suma de todos los totales de línea.

---

## Impuesto

Debe existir un porcentaje editable.

Por defecto:

```text
19%
```

---

## Total final

```text
subtotal + impuesto
```

Todos los cálculos deben actualizarse automáticamente al escribir.

---

# Requerimientos visuales

## Inspiración visual

Tomar como referencia el diseño de la imagen:

- Encabezado verde corporativo
- Tablas con bordes finos
- Diseño limpio
- Espaciado elegante
- Tipografía moderna
- Apariencia tipo documento empresarial

---

# Tecnologías

## Debe usarse únicamente

- HTML5
- CSS3
- JavaScript Vanilla

NO usar:

- React
- Angular
- Vue
- Backend
- Base de datos

Debe ser totalmente compatible con GitHub Pages.

---

# Estructura esperada

```text
/
│
├── index.html
├── style.css
├── script.js
├── assets/
│   └── logo-placeholder.png
└── README.md
```

---

# Diseño responsive

Debe funcionar correctamente en:

- Desktop
- Tablet
- Mobile

En pantallas pequeñas:

- Las tablas deben mantenerse utilizables
- Los inputs no deben romper el diseño

---

# Funcionalidades extra deseadas

## Exportar a PDF

Agregar un botón:

```text
Descargar PDF
```

Usar:

```text
html2pdf.js
```

### Configuración de Exportación (Crítico)

- El PDF debe mantener siempre el diseño de escritorio ("desktop layout"), incluso cuando se descargue desde un dispositivo móvil.
- No se deben mostrar botones de acción (como "+ Agregar producto" o "Descargar PDF") en el documento final.
- Los bordes y fondos de los inputs deben ocultarse para que el PDF parezca un documento impreso profesional.

---

## Guardado local

Guardar automáticamente la cotización en:

```javascript
localStorage
```

Para no perder cambios al recargar.

---

## Logo personalizable

Permitir subir una imagen local para reemplazar el logo.

---

# Estilo esperado

## Colores

Principal:

```css
#ffe100ff
```

Secundario:

```css
#c4c4c4ff
```

Texto:

```css
#333333
```

---

# UX/UI

La aplicación debe sentirse como una herramienta profesional real.

Evitar apariencia de formulario escolar.

Usar:

- sombras suaves
- bordes redondeados discretos
- buena separación visual
- tamaños consistentes

---

# Requerimientos técnicos importantes

## Inputs numéricos

- No permitir valores negativos
- Validar cantidades
- Validar precios

---

## Moneda

Formatear valores automáticamente como moneda.

Ejemplo:

```text
$ 120,000
```

---

## Código limpio

El JavaScript debe estar organizado en funciones:

Ejemplo:

```javascript
addRow()
removeRow()
calculateTotals()
formatCurrency()
saveToLocalStorage()
loadFromLocalStorage()
```

---

# GitHub Pages

El proyecto debe quedar listo para desplegarse directamente en GitHub Pages.

No debe requerir compilación.

---

# Resultado esperado

Una aplicación web elegante y funcional donde:

- Se puedan editar todos los datos
- Agregar productos dinámicamente
- Calcular automáticamente subtotales, impuestos y total final
- Descargar la cotización en PDF
- Mantener una apariencia profesional similar al diseño adjunto sin copiarlo y adaptarlo a tu creatividad  (C:\Users\chami\Desktop\Proyecto\recurso.jpeg)
- Funcione perfectamente como sitio estático en GitHub Pages

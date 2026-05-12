# Generador de Cotizaciones - Apicola la Estancia

Aplicación web estática (HTML, CSS y JavaScript Vanilla) diseñada para generar cotizaciones editables. Inspirada en diseños empresariales elegantes con funcionalidades dinámicas.

## Características

- 📝 **Totalmente Editable:** Todos los campos de información corporativa y del cliente pueden ser modificados directamente en la vista.
- 🖼️ **Logo Personalizable:** Permite subir tu propio logo que se mantendrá guardado en tu navegador.
- ➕ **Tabla Dinámica de Productos:** Añade y elimina filas de productos/servicios a demanda.
- 🧮 **Cálculos Automáticos:** El sistema calcula los totales por fila, subtotal, impuestos y total general al instante.
- 💾 **Autoguardado Local:** Usa `localStorage` para que no pierdas tus datos incluso si recargas la página accidentalmente.
- 📄 **Exportación a PDF:** Permite descargar la cotización en formato PDF con 1 clic (usando html2pdf).
- 📱 **Diseño Responsive:** Funciona bien en pantallas grandes y se adapta a dispositivos móviles.

## Tecnologías Utilizadas

- **HTML5:** Estructura semántica.
- **CSS3:** Estilos limpios y uso de variables CSS para los colores principales (Amarillo y Gris).
- **JavaScript Vanilla:** Lógica para la dinámica sin requerir frameworks de terceros.
- **Librería Externa:** `html2pdf.js` para la generación de PDFs.

## Cómo Usar

Dado que es una aplicación 100% estática, solo necesitas:
1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en tu navegador web de preferencia.

## Despliegue en GitHub Pages

Este proyecto está listo para ser alojado gratuitamente en GitHub Pages sin necesidad de compilación o backend.

1. Sube los archivos de este directorio a un repositorio en GitHub.
2. Ve a la pestaña **Settings** de tu repositorio.
3. En el menú de la izquierda, haz clic en **Pages**.
4. Bajo la sección "Build and deployment", selecciona `Deploy from a branch`.
5. En la sección "Branch", selecciona la rama `main` (o `master`) y la carpeta `/(root)`.
6. Haz clic en **Save**. En unos minutos tu sitio estará en vivo en la URL provista por GitHub.

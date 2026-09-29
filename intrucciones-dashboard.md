# Contexto del proyecto

Necesito desarrollar únicamente el **frontend de una aplicación web tipo dashboard**, utilizando tecnologías web tradicionales y una estructura de código clara, mantenible y preparada para futuras ampliaciones.

El sistema debe tomar como referencia visual los archivos que dejaré disponibles en la raíz del proyecto:

- `logo.png`: utilizar este logo como referencia para definir la paleta de colores de la aplicación.
- Dos imágenes `.jpg`: contienen el diseño y estructura de los dos formularios que deben implementarse.

## Objetivo principal

Crear una página principal con diseño de **dashboard administrativo**, moderno, limpio, profesional y responsive.

La interfaz debe incluir una **barra lateral fija o adaptable en el lado izquierdo**, desde la cual el usuario pueda navegar entre dos secciones principales.

Cada sección deberá mostrar un formulario diferente basado visualmente en las capturas JPG proporcionadas.

## Stack tecnológico obligatorio

Utilizar exclusivamente:

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery

Evitar frameworks adicionales como React, Vue, Angular u otros.

## Estructura general del Dashboard

La aplicación debe contener:

- Sidebar lateral izquierda.
- Logo de la empresa en la parte superior de la sidebar.
- Nombre o título del sistema.
- Área principal de contenido.
- Diseño responsive para escritorio, tablet y dispositivos móviles.
- Navegación entre las distintas secciones sin necesidad de recargar toda la página cuando sea posible.
- Estilo visual profesional y corporativo.

La sidebar deberá tener al menos dos opciones:

1. Formulario 1
2. Formulario 2

Los nombres pueden ajustarse posteriormente si la información de las capturas permite identificar nombres más apropiados.

Al seleccionar una opción del menú, debe mostrarse el formulario correspondiente en el panel principal.

# Formularios

Utiliza las dos capturas JPG entregadas como principal referencia para construir la estructura de cada formulario.

Debes analizar visualmente:

- Encabezados.
- Secciones.
- Filas.
- Columnas.
- Textos.
- Agrupaciones.
- Orden de los elementos.
- Distribución visual.

No es necesario copiar defectos visuales de las imágenes. La implementación debe modernizar el diseño utilizando Bootstrap, manteniendo la misma información y estructura funcional.

## Tabla o sección de evaluación

En las partes de los formularios donde aparezcan las siguientes columnas, deben implementarse de esta manera:

### Columna "Check"

Debe contener un campo:

```html
<input type="checkbox">
```

Cada fila debe tener su propio checkbox independiente.

### Columna "Nivel de gravedad"

Debe contener un elemento `<select>` utilizando estilos Bootstrap.

Opciones disponibles:

```text
Seleccionar...
Bajo
Medio
Alto
```

Por ejemplo:

```html
<select class="form-select">
    <option value="">Seleccionar...</option>
    <option value="bajo">Bajo</option>
    <option value="medio">Medio</option>
    <option value="alto">Alto</option>
</select>
```

### Columna "Observación"

Debe contener un campo de texto donde el usuario pueda escribir una observación.

Utilizar inicialmente:

```html
<input type="text" class="form-control">
```

Si por diseño la observación requiere más espacio, se puede utilizar `<textarea>`.

# Diseño visual

Utiliza `logo.png` como referencia visual para extraer o interpretar una paleta de colores coherente con la identidad de la aplicación.

Aplicar esos colores principalmente en:

- Sidebar.
- Botones.
- Elementos activos del menú.
- Encabezados.
- Bordes o elementos destacados.
- Estados hover.
- Títulos secundarios.

Mantener fondos claros y buena legibilidad.

El resultado debe verse como una aplicación empresarial moderna y no como una página HTML básica.

## Lineamientos visuales

Priorizar:

- Diseño minimalista.
- Buena separación entre secciones.
- Cards de Bootstrap cuando correspondan.
- Sombras suaves.
- Bordes redondeados moderados.
- Tipografía legible.
- Espaciado consistente.
- Tablas responsive.
- Sidebar moderna.
- Estados hover.
- Indicador visual de la opción actualmente seleccionada.

No utilizar colores excesivamente saturados si no están presentes en el logo.

# Responsive Design

La aplicación debe funcionar correctamente en diferentes tamaños de pantalla.

En escritorio:

- Sidebar visible en el lado izquierdo.
- Contenido utilizando el espacio restante.

En dispositivos móviles:

- La sidebar puede transformarse en un menú colapsable.
- Las tablas deben poder desplazarse horizontalmente si es necesario.
- Los formularios deben reorganizar correctamente sus columnas.

Utilizar las herramientas responsive de Bootstrap.

# Organización del código

Evitar colocar todo el proyecto en un único archivo HTML.

Utilizar como mínimo una estructura similar a:

```text
/
├── index.html
├── logo.png
├── captura-formulario-1.jpg
├── captura-formulario-2.jpg
│
├── css/
│   └── styles.css
│
└── js/
    └── app.js
```

Si resulta conveniente separar los formularios:

```text
/
├── index.html
│
├── pages/
│   ├── formulario1.html
│   └── formulario2.html
│
├── css/
│   └── styles.css
│
└── js/
    └── app.js
```

Elige la estructura que resulte más limpia y mantenible.

# JavaScript y jQuery

Utilizar jQuery para las interacciones necesarias, por ejemplo:

- Navegación entre formularios.
- Mostrar u ocultar secciones.
- Cambiar el estado activo del menú.
- Manejar comportamientos de la sidebar.
- Futuras validaciones.

Evitar JavaScript innecesariamente complejo.

# Consideraciones de implementación

Por ahora se desarrollará solamente el frontend.

No implementar:

- Backend.
- Base de datos.
- APIs.
- Sistema de autenticación.
- Persistencia de datos.

Sin embargo, preparar los formularios correctamente utilizando:

- `id`
- `name`
- `value`

para que posteriormente puedan conectarse fácilmente a un backend.

Los nombres de IDs deben ser descriptivos y evitar identificadores genéricos como:

```text
input1
input2
checkbox1
select1
```

Preferir nombres como:

```text
nivelGravedadIluminacion
observacionExtintor
checkSalidaEmergencia
```

# Calidad del código

Quiero que el resultado tenga calidad de proyecto real.

Aplicar:

- HTML semántico.
- CSS organizado.
- Clases reutilizables.
- JavaScript organizado.
- Indentación consistente.
- Nombres descriptivos.
- Separación de responsabilidades.
- Comentarios únicamente donde aporten contexto.
- Evitar duplicación innecesaria de código.

# Flujo de trabajo solicitado

Antes de comenzar a generar código:

1. Revisa los archivos existentes en el proyecto.
2. Identifica `logo.png`.
3. Analiza las dos capturas JPG.
4. Determina la estructura de ambos formularios.
5. Identifica una paleta de colores apropiada basándote en el logo.
6. Revisa si ya existe código que pueda reutilizarse.
7. Después comienza la implementación.

No sobrescribas código existente sin comprobar primero si se utiliza.

# Resultado esperado

Al finalizar debo poder abrir `index.html` y visualizar:

- Dashboard profesional.
- Sidebar funcional.
- Logo correctamente integrado.
- Dos opciones de navegación.
- Formulario 1.
- Formulario 2.
- Checkboxes en la columna Check.
- Dropdowns Bajo / Medio / Alto en Nivel de gravedad.
- Campos de observación.
- Diseño inspirado en el logo.
- Diseño responsive.
- Código organizado para continuar desarrollando posteriormente.

Prioriza que la interfaz sea **limpia, profesional, consistente y fácil de mantener**, respetando la información contenida en las imágenes de referencia.

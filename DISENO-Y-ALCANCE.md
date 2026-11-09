# CAI · Diseño y alcance de la demostración

Interfaz web adaptable a escritorio, tableta y móvil. La portada sigue la identidad de la web de referencia: azul marino, marfil, rojo y dorado; navegación superior, globo terráqueo, secciones editoriales, escudo y fotografía de la comunidad. El área privada de demostración conserva sus módulos y adopta el azul marino.

## Fuentes aplicadas

- `Documento para el desarrollador v1.md`, fecha 2026-11-07: autoridad para las reglas y el catálogo vigente.
- `CAI_Sistema_de_Rangos_y_Misiones.xlsx`: sus diez escudos originales y referencias de rangos y pantallas.
- La referencia se recuperó desde su respuesta JavaScript pública y su fuente canónica `https://eltauromods.github.io/Cruzadapologetica_itinerante/`. Se revisaron su HTML, estilos, portada y configuración del globo amCharts. Se reutilizan el escudo, la imagen de León XIV, la fotografía de hermanos y la estatua de san Pedro procedentes de los recursos de esa misma web. No se copiaron sus funciones de feed, formación o mapas con ubicaciones personales, por ser incompatibles con el MD vigente.
- amCharts 5: https://www.amcharts.com/docs/v5/charts/map-chart/ y https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/.

## Experiencia implementada

- Portada pública en `/`, acceso propio en `/ingresar` y área de miembros en `/miembros`. El inicio de sesión lleva directamente al mapa mundial.
- Globo 3D ortográfico amCharts, con giro que se puede pausar, arrastre, zoom, retorno al mundo y alternativa de mapa plano. La portada usa un globo ilustrativo sin registros ni puntos de miembros; los conteos se muestran después de ingresar.
- Inicio de sesión propio de CAI con usuario `admin` y contraseña pública de demostración `CaiDemo2026!`, comprobación de credenciales, mostrar/ocultar contraseña, sesión de ocho horas y cierre de sesión. El alojamiento permite abrir el enlace sin autenticarse con ChatGPT.
- Panel de misión con resumen, rango, puntos, progreso, Hospitalidad, hito pendiente y misión del mes.
- Mapa de apologetas con amCharts 5, controles, selección de países y filtros por país, región y ciudad. Solo muestra conteos ficticios de miembros activos; sus marcadores son centros geográficos de zonas.
- Catálogo importado del MD: 47 misiones y 4.635 puntos. El perfil de ejemplo es rango 4 y tiene 33 misiones disponibles.
- Detalle y reporte de misión, fecha hasta 14 días anterior, compañeros, bitácora, archivos seleccionados, consentimiento, revisión por mención de menores y regla de oro.
- Límite de escuadra del rango 4: dos a tres miembros. EST-02 requiere tres en total.
- Registro de honor para la confesión, sin solicitar evidencia sacramental.
- Diez rangos con sus escudos, lemas e hitos actualizados. El rango 4 no exige examen ni hito; el rango 10 es electivo.
- Bitácora privada, estados de revisión y apelación de ejemplo.
- Formulario de registro en tres pasos: datos, comunidad y GPS, título del curso y aceptación. Solo simula el estado en espera, sin crear cuentas reales.
- Fichas públicas de lugares de culto ficticios con amCharts, publicación inmediata en la sesión y retirada desde la administración de ejemplo.
- Perfil editable, notificaciones internas y reporte de conducta de ejemplo.
- Panel de administración de muestra: revisión, validación con bono de calidad, rechazo motivado, consulta de miembros y catálogo, misión del mes y gestión de fichas.

## Límites de esta entrega de diseño

El acceso con usuario y contraseña es una simulación en el navegador; no hay autenticación ni autorización de servidor, base de datos compartida, subida de archivos, correos, recuperación de contraseña o procesos automáticos de inactividad. El navegador conserva la demostración de perfil, puntos y reportes en `localStorage`, y la sesión de prueba sin contraseña en `sessionStorage`; los archivos seleccionados no se suben. Las fichas nuevas solo viven en memoria durante la sesión. Los títulos y contraseñas del registro no se guardan. La administración aparece después del acceso de prueba y está identificada como simulación. Las credenciales de prueba son públicas y no constituyen una protección de datos. El alojamiento es público para poder abrir el formulario propio sin pasar por ChatGPT; nunca debe usarse con datos personales reales.

Antes de producción se necesitan servidor, autenticación, permisos efectivos, almacenamiento privado y validación transaccional de puntos/ascensos, procesos de inactividad, sanciones, auditoría, pruebas integradas y revisión legal. Los permisos adicionales del Capítulo y las cuestiones señaladas como pendientes en el MD no se consideran decisiones de negocio cerradas por esta maqueta. El símbolo CAI es provisional hasta recibir el logo final.

## Verificación

- TypeScript sin errores.
- Compilación de producción de Next.js completada para la entrega a Vercel, incluidas las rutas `/`, `/ingresar` y `/miembros`. Se conservan los archivos y comandos del alojamiento anterior con Vinext/Sites como referencia.
- 17 comprobaciones del catálogo y reglas de demostración: cantidad y suma de misiones, acceso por rango, límites de fecha, bonos no acumulables y registro de honor.
- 18 comprobaciones del login de prueba: credenciales válidas e inválidas, sesión restaurada, caducidad, formato inválido, cierre de sesión, ausencia de contraseña en la sesión y uso del acceso propio.
- 18 comprobaciones de portada, rutas, acceso al mapa, proyecciones, privacidad, movimiento reducido y recursos visuales.
- Respuesta HTTP 200 del panel renderizado con título, contenido y atributo de idioma español.
- No se pudo completar una revisión visual ni pruebas de interacción en navegador por la limitación del control de Chrome. Los puntos de quiebre adaptables están implementados; su revisión visual queda pendiente.

## Imagen creada para este proyecto

Archivo: `public/images/cathedral.png`. Generada con la herramienta integrada ImageGen; representa una catedral inventada. No identifica una iglesia real.

Prompt final:

> Use case: photorealistic-natural. Asset type: wide photographic banner for the personal dashboard of a Catholic missionary platform, refined editorial design. Primary request: a serene Spanish colonial Catholic cathedral facade and bell tower in warm late afternoon light, stone arches, restrained beautiful baroque details, subtle atmospheric grain. Composition: extremely wide landscape 3:1, architectural subject on the right half, left half recedes into dark softly textured olive-brown shadows suitable for white text overlay; no people or cars. Colors: sandstone, muted gold, deep olive charcoal shadows. Mood: reverent, welcoming, contemplative, real architecture photography. No text, symbols added, UI, borders, logos, or watermarks. This is an illustrative invented cathedral, not a depiction of a named real building.

Se conserva la atribución de amCharts que incorpora la biblioteca. Para retirarla se necesita la licencia adecuada.

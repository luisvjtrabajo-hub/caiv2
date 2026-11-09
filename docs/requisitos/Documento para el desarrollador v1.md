# CAI — Documento para el desarrollador (versión 1)

Fecha: 2026-11-07. Este archivo reúne todo lo que el equipo de desarrollo necesita: qué es el producto, qué funciones debe tener, las reglas de negocio, los catálogos y lo que falta por definir.

**Estado:** las decisiones de negocio de la v1 están cerradas. Quedan pendientes de otros destinatarios: la consulta legal (datos personales y consentimiento), el logo y las decisiones técnicas de la parte 6.

**Cómo usarlo**
- Cada regla tiene un ID estable (por ejemplo USU-04, PTS-07, ASC-03) y las funciones lo citan. Las menciones a otros documentos (por ejemplo "Reglas de negocio.md") remiten a las partes de este archivo.
- Si algo no está definido, no se supone: se pregunta. Los campos y comportamientos sin definir figuran como "por definir".
- Las reglas de la parte 3 prevalecen sobre cualquier otro texto, incluido el Excel original.

## Contenido

1. Guía general: producto, alcance, roles, entidades y flujos
2. Funciones de la aplicación
3. Reglas de negocio
4. Rangos, hitos y economía de puntos
5. Catálogo de misiones (47 misiones)
6. Huecos técnicos para el equipo
7. Glosario
8. Escenarios de prueba


---

## Parte 1. Guía general: producto, alcance, roles, entidades y flujos

Fecha: 2026-10-29. Las reglas completas están en la parte 3; aquí se citan por su ID.

### 1. Qué es el producto

CAI (Cruzada Apologética Itinerante) es una plataforma misionera católica para hombres hispanohablantes mayores de 18 años que terminaron un curso de apologética. Los miembros reportan misiones, suben evidencia y suben de rango por puntos e hitos, y un administrador valida. Hay un mapa de apologetas y de sectas. Es única: no existe algo similar hoy (PRD-01).

### 2. Alcance de la v1

**Dentro (PRD-02, PRD-03):**
- Registro con título del curso.
- Mapa de apologetas, con conteo por país, estado y ciudad.
- Reporte de misiones, con evidencia.
- Rangos, puntos e hitos con validación.
- Mapa de sectas y fichas.
- Bitácoras y crónicas.
- Panel de administración web.

**Fuera (PRD-04):**
- Pantalla de Bienvenida.
- Reuniones y calendario.
- Ala de caridad femenina.
- Ramas paralelas de rangos.
- Donaciones y pagos.
- Modo offline (se captura en el celular y se sube después).
- Buscador de contenido.
- Formación dentro de la app.
- Exámenes y la figura del padrino (no existen).

**Plataforma (PRD-05 a PRD-09):** iOS y Android, web si se puede; preferencia híbrida; solo español; notificaciones solo dentro de la app; 800 usuarios esperados en seis meses.

### 3. Roles

| Rol | Qué hace | Reglas |
|---|---|---|
| Miembro | Reporta misiones, ve el mapa, sube fichas. Es hombre, mayor de 18 años. | USU-01, USU-02 |
| Administrador | Valida, aprueba títulos, crea misiones y topes, resuelve apelaciones, elimina fichas y contenido, registra el rango 10, asigna el título de Capítulo. Puede ser mujer. | ROL-01, ROL-07 a ROL-12 |
| Capítulo | Valida con los mismos permisos de validación. Mientras no exista, lo hace el administrador. | ROL-03, ROL-05 |
| Rango 5 en adelante | Además de ser miembros, pueden crear misiones nuevas. | ROL-07 |

Los permisos del Capítulo además de validar los define el equipo de desarrollo (PEN-06).

### 4. Entidades principales

Solo se listan los campos ya definidos. Lo demás es "por definir".

| Entidad | Campos definidos |
|---|---|
| Miembro | Nombres y apellidos, correo o teléfono, contraseña, fecha de nacimiento, autodeclaración de sexo, país, estado o región, ciudad escrita, GPS, parroquia, sacerdote de su parroquia (texto), escuela y fecha de graduación, título (foto o PDF), rango, puntos acumulados, estado, hitos cumplidos. Opcionales: foto, diócesis, comunidad, contacto de emergencia, WhatsApp. (USU-10, USU-11) |
| Misión | Código, nombre, categoría, puntos, evidencia exigida, rango mínimo, repetible, tope mensual. Catálogo en la parte 5. |
| Reporte | Misión, participantes (líder y compañeros, mínimo dos en campo), fecha de la misión (hasta dos semanas antes), evidencia, casilla de consentimiento del interlocutor, nombre del interlocutor opcional y no público, estado (pendiente, validado, rechazado, en apelación). Otros campos, por definir. |
| Hito | Código, rango que abre, requisito, evidencia, puntos. |
| Grupo | Líder y miembros. Límites de mando por rango (GRP-02). |
| Ficha de secta | Nombre, dirección, coordenadas, foto, rama (texto libre). Solo un miembro con cuenta registrada puede crearla; la puede ver cualquier persona (MAP-03). |
| Sanción y apelación | Motivo, puntos quitados, apelación decidida por el administrador. |
| Notificación | Dentro de la app. Tipos definidos: aviso de inactividad al administrador a los 60 días. |

### 5. Flujos

**Ingreso**
1. La persona se registra con sus datos y el título del curso (USU-10).
2. Queda "en espera" y el administrador verifica el título a mano (USU-06).
3. Si lo aprueba, pasa a "activo" como Postulante. Si lo rechaza, puede volver a presentarlo (USU-07).

**Reporte, validación y puntos**
1. El miembro elige la misión (solo las de su rango o menores) y arma el reporte con sus compañeros (REP-06).
2. Sube la evidencia, que puede ser diferida (REP-05). Entre las 20:00 y las 06:00 la app avisa, sin bloquear (REP-08).
3. El administrador o el Capítulo validan. Al marcarlo exitoso y correcto, se suman los puntos a todos los participantes (PTS-01, PTS-03, PTS-04).
4. Si se rechaza por evidencia falsa, se quitan solo los puntos de ese reporte (SAN-05).

**Ascenso**
- Hacen falta los puntos del umbral y el hito del rango (ASC-01), salvo el rango 4, que no tiene hito. Desde el ascenso al rango 4 se exige también una misión de Hospitalidad validada en los últimos 90 días (ASC-03).
- El hito lo validan el administrador o el Capítulo (ASC-02).
- El rango 10 lo registra el administrador tras una elección fuera de la app (ROL-12).

**Sanción y apelación**
- La primera falta de evidencia falsa quita los puntos del reporte. La segunda, que cuenta siempre, baja un rango y quita el hito del rango perdido (SAN-05, ASC-04).
- El miembro puede apelar; decide el administrador viendo la evidencia (SAN-06).

**Inactividad**
- A los 60 días sin misión reportada se avisa al administrador; a los 120 pasa a inactivo, conservando rango y puntos (EST-03). Reportar una misión lo reactiva (EST-04).

### 6. Solución de problemas

| Situación | Qué regla aplica | Qué hacer |
|---|---|---|
| Un miembro alcanzó su tope mensual y ayuda en la misión de otro. | PTS-04 | Sumarle los puntos igualmente. |
| Dos bonos aplican a la misma misión. | PTS-07 | Aplicar solo el de mayor valor. |
| Un miembro pierde puntos y su total se acercaría a cero. | PTS-06 | Restar solo lo sancionado; nunca llega a cero. |
| El interlocutor no consintió que se fotografíe. | REP-02 | Solo se admite bitácora escrita. |
| La misión es la confesión (VIG-02). | REP-03 | Registro de honor, sin pedir constancia ni foto. |
| Un reporte menciona a un menor. | REP-11 | Pasa a revisión del administrador. |
| Se sube una evidencia entre las 20:00 y las 06:00. | REP-08 | Mostrar advertencia; no bloquear. |
| Un miembro sin misión hace 60 o 120 días. | EST-03 | Avisar al administrador; luego pasar a inactivo. |
| Un miembro intenta ascender sin Hospitalidad reciente. | ASC-03 | No permitir el ascenso. |
| Nadie tiene el título de Capítulo. | ROL-03 | El administrador cumple su función. |
| Un miembro quiere eliminar una ficha de secta. | ROL-09 | No puede; solo el administrador. |
| Se sube una ficha. | MAP-03 | Aparece en el mapa de inmediato, sin aprobación. |
| Un campo o comportamiento no está definido. | Ninguna | No suponerlo: consultar al equipo de negocio. |

### 7. Pendientes técnicos

| ID | Pendiente | Referencia |
|---|---|---|
| PEN-01 | Resuelta: la única escuela es el curso del Padre Luis Toro. Se recomienda mantener la tabla de escuelas (editable por el administrador) con esa entrada, para agregar otras sin cambiar el código. | USU-04, USU-14 |
| PEN-08 | Automatizar la verificación del título del curso (hoy manual). | USU-06 |
| PEN-09 | Límite de tamaño y duración de videos y tiempo de almacenamiento. | REP-02 |
| PEN-10 | Ley de protección de datos, borrado de cuenta, datos sensibles, validez de la casilla de consentimiento. | Consulta legal |
| PEN-02 | Resuelta: no hay exámenes en la plataforma. | USU-12 |
| — | Lista de huecos técnicos para el equipo (se prepara a pedido). | |

---

## Parte 2. Funciones de la aplicación

Fecha: 2026-11-07. Lista de todo lo que la app debe hacer en la v1. Cada función cita las reglas de la parte 3. Los criterios de aceptación se pueden usar como casos de prueba, junto con los escenarios S-01 a S-12 de la parte 8.

**Prioridad:** P0 son los tres innegociables (PRD-02): registro con título, mapa de apologetas y reporte de misiones. P1 es el resto de la v1 (PRD-03).

**Lo que no se define aquí:** las pantallas visuales (logo y escudos pendientes) y los detalles técnicos, que están en "Huecos técnicos para el equipo.md".

### 1. Pantallas de la v1

| Pantalla | Quién la ve | Qué muestra | Origen |
|---|---|---|---|
| Registro e ingreso | Quien se registra | Formulario con datos y título del curso; estado de la aprobación | Nueva |
| Dashboard | Miembro | Rango con su lema, puntos, barra hasta el siguiente umbral, hito pendiente, misiones en curso y misión emergente del mes | Pantalla 1 del Excel, sin el enlace al curso |
| Mapa de apologetas | Miembro | Conteo de apologetas por país, estado y ciudad | Mapa del Excel y decisión 2026-10-28 |
| Mapa de sectas y fichas | Cualquier persona (ver); miembro con cuenta (crear) | Fichas de sectas en el mapa | Pantalla 5 del Excel, ajustada |
| Perfil del miembro | Miembro | Rango, lema, historial de misiones, puntos por área, bonos y sanciones | "Datos del soldado", sin padrino |
| Misiones | Miembro | Catálogo según su rango, misiones en curso y completadas, creación de reportes | Pantalla 2 del Excel |
| Panel de administración (web) | Administrador y Capítulo | Validación, miembros, catálogo, apelaciones, alertas, contenido | Pantalla 3 del Excel, ampliada |

**Quedan fuera de la v1:** Bienvenida (PRD-04) y Certificados (USU-15).

### 2. Funciones por módulo

#### M1. Registro e ingreso (P0)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-101 | Registrarse con correo o teléfono y contraseña. | Aspirante | USU-08 | Con cualquiera de los dos datos se crea la cuenta. |
| F-102 | Completar los datos obligatorios y opcionales. | Aspirante | USU-10, USU-11 | No se envía el registro con un obligatorio vacío. |
| F-103 | Autodeclarar ser hombre y mayor de 18 años. | Aspirante | USU-01, USU-02 | Con fecha de nacimiento menor a 18 años no se completa el registro. |
| F-104 | Subir el título del curso del Padre Luis Toro (foto o PDF) y elegir la escuela. | Aspirante | USU-04, USU-14 | Sin título no se envía el registro. La lista de escuelas tiene una sola entrada. |
| F-105 | Registrar la ubicación por GPS y por ciudad escrita. | Aspirante | USU-09 | Se guardan ambos datos. |
| F-106 | Aceptar términos, privacidad y código de conducta. | Aspirante | USU-10 | Sin aceptación no se envía el registro. |
| F-107 | Quedar "en espera" hasta que el administrador revise el título. | Aspirante | EST-01, EST-02 | Estando en espera no puede reportar misiones. |
| F-108 | Aprobar o rechazar el título; el rechazo lleva un motivo. | Administrador | USU-06 | Al aprobar, el aspirante pasa a activo como Postulante y recibe una notificación. |
| F-109 | Volver a presentar un título rechazado. | Aspirante | USU-07 | Sin límite de intentos ni plazo. |
| F-110 | Iniciar sesión y recuperar la contraseña. | Todos | — | Función estándar, sin regla de negocio propia. |

#### M2. Dashboard y perfil (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-201 | Ver el rango actual con su lema, los puntos acumulados y la barra hasta el siguiente umbral. | Miembro | ASC-01, PTS-05 | La barra usa los umbrales de "Rangos, hitos y economía de puntos.md". |
| F-202 | Ver el hito pendiente del rango siguiente. | Miembro | ASC-01 | En el rango 3 no muestra hito para el 4, porque no existe. |
| F-203 | Ver la misión emergente del mes. | Miembro | ROL-11 | Muestra la misión que definió el administrador. |
| F-204 | Ver el historial de misiones, los puntos por área, los bonos y las sanciones. | Miembro | PTS-01 | Cada movimiento de puntos indica su origen. |
| F-205 | Editar los datos del perfil. | Miembro | USU-10 | La edición no cambia el rango ni los puntos. |
| F-206 | Ver el estado propio (activo o inactivo). | Miembro | EST-01 | Refleja el estado real. |

#### M3. Mapa de apologetas (P0)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-301 | Mostrar el conteo de apologetas por país, estado y ciudad. | Miembro | MAP-01 | Cuenta solo a los miembros activos. No muestra la ubicación exacta de nadie. |
| F-302 | Navegar de país a estado y a ciudad. | Miembro | MAP-01 | Cada nivel muestra su conteo. |

#### M4. Misiones y reportes (P0)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-401 | Ver el catálogo de misiones disponibles para el rango del miembro. | Miembro | Catálogo | Solo aparecen las de rango mínimo igual o inferior. |
| F-402 | Ver las misiones en curso y las completadas, con sus puntos. | Miembro | Catálogo | Muestra el estado de cada reporte. |
| F-403 | Crear un reporte: misión, fecha, participantes, bitácora y evidencia. | Miembro | REP-01, REP-05 | La fecha puede ser hasta dos semanas anterior. Sin evidencia no se envía. |
| F-404 | Registrar a los compañeros de misión desde la lista de miembros. | Miembro | REP-06 | En misiones de campo hay al menos dos miembros. |
| F-405 | Adjuntar fotos y videos de la galería; marcar la casilla de consentimiento del interlocutor. | Miembro | REP-02 | Sin la casilla solo se admite bitácora escrita. |
| F-406 | Escribir una crónica opcional con fotos. | Miembro | REP-04 | Una crónica sin fotos no se acepta. |
| F-407 | Indicar el nombre del interlocutor de forma opcional y no pública. | Miembro | REP-12 | El nombre solo lo ven el administrador y el Capítulo. |
| F-408 | Marcar la casilla de la regla de oro antes de enviar. | Miembro | SAN-01 | Sin la casilla no se envía. |
| F-409 | Mostrar una advertencia al subir evidencia entre las 20:00 y las 06:00. | Sistema | REP-08 | La advertencia no bloquea el envío. |
| F-410 | Pedir la invitación escrita en DEB-04 y EST-05. | Sistema | REP-10 | Sin la invitación adjunta no se envía. |
| F-411 | Enviar a revisión del administrador los reportes que mencionan menores. | Sistema | REP-11 | El reporte queda marcado para revisión. |
| F-412 | Registrar las misiones de Vida interior dentro de la app (VIG-01, VIG-02, VIG-03, VIG-05, VIG-06). | Miembro | REP-03 | VIG-02 no pide constancia ni foto. |
| F-413 | Notificar al miembro cuando su reporte se valida o se rechaza. | Sistema | PRD-08 | La notificación aparece dentro de la app. |

#### M5. Validación (P0 para validar reportes; P1 para hitos)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-501 | Ver la cola de reportes pendientes con su evidencia, participantes y misión. | Administrador y Capítulo | ROL-05, REP-07 | Solo estos roles ven reportes, fotos y crónicas. |
| F-502 | Marcar un reporte como exitoso y correcto. | Administrador y Capítulo | PTS-01 a PTS-04 | Se suman los puntos a todos los participantes, incluso a quien ya alcanzó su tope. |
| F-503 | Rechazar un reporte con motivo. | Administrador y Capítulo | SAN-05 | Si es evidencia falsa, se quitan solo los puntos de ese reporte. |
| F-504 | Registrar la reincidencia de evidencia falsa. | Sistema | SAN-05 | A la segunda vez, sin ventana de tiempo, baja un rango. |
| F-505 | Aplicar el bono de calidad (+20%) a una evidencia excelente. | Administrador y Capítulo | PTS-07, PTS-08 | Si coinciden bonos, se aplica solo el de mayor valor. |
| F-506 | Validar los hitos. | Administrador y Capítulo | ASC-02 | Al validarlo se otorgan sus puntos. |
| F-507 | Validar sin plazo. | Sistema | PTS-02 | La cola no vence reportes. |

#### M6. Puntos, rangos e hitos (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-601 | Llevar el acumulado de puntos, sin caducidad. | Sistema | PTS-05, PTS-06 | Nunca llega a cero; al sancionar solo se resta lo sancionado. |
| F-602 | Aplicar el tope mensual de cada misión. | Sistema | PTS-09, ROL-08 | Un participante que ayuda recibe los puntos aunque haya llegado al tope. |
| F-603 | Aplicar los bonos de constancia, primicia y calidad. | Sistema | PTS-07, PTS-08 | No se acumulan; se aplica el mayor. |
| F-604 | Ascender cuando se cumplen puntos, hito y Hospitalidad. | Sistema | ASC-01, ASC-03, ASC-06 | Al llegar a un rango se suma su bono de ascenso. El rango 4 no exige hito. |
| F-605 | Exigir una misión de Hospitalidad validada en los últimos 90 días para ascender al rango 4 y siguientes. | Sistema | ASC-03 | Sin ella no se asciende, aunque los puntos y el hito estén cumplidos. |
| F-606 | Descender un rango por segunda evidencia falsa y retirar el hito del rango perdido. | Sistema | SAN-05, ASC-04 | Conserva los puntos menos los quitados; debe cumplir el hito otra vez. |
| F-607 | Registrar el rango 10 por decisión del administrador. | Administrador | ASC-05, ROL-12 | No se alcanza por puntos. |

#### M7. Fichas de sectas (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-701 | Crear una ficha con nombre, dirección, coordenadas, foto y rama. | Miembro con cuenta | MAP-02, MAP-03 | La rama es texto libre. No hay campo de descripción doctrinal. |
| F-702 | Publicar la ficha en el mapa al subirla. | Sistema | MAP-03 | No requiere aprobación previa. |
| F-703 | Ver las fichas y el conteo de sectas por país, estado y ciudad. | Cualquier persona | MAP-01, MAP-03 | No requiere cuenta. |
| F-704 | Eliminar una ficha. | Administrador | ROL-09 | Un miembro no puede eliminarla. |
| F-705 | Dar puntos de CAR-01 solo cuando el administrador valida la misión. | Administrador | MAP-04 | La publicación de la ficha no otorga puntos. |
| F-706 | Dar el bono de primicia a la primera ficha de una secta nunca registrada. | Sistema | PTS-08 | Detectar un duplicado impide el bono. |

#### M8. Grupos (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-801 | Armar un grupo de misión con un líder y sus participantes. | Miembro líder | GRP-01 | Todos los participantes quedan en el reporte. |
| F-802 | Limitar quién puede liderar según el rango. | Sistema | GRP-02 | Los rangos 1 a 3 no lideran. El rango 4 lidera hasta tres miembros; el 5, hasta ocho. |
| F-803 | Aplicar las restricciones de campo. | Sistema | GRP-03 | El Postulante no sale a campo. El rango 2 sale con un rango 4 o superior. |

#### M9. Sanciones, apelaciones y conducta (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-901 | Apelar una sanción o un rechazo. | Miembro | SAN-06 | La apelación llega al administrador. |
| F-902 | Resolver apelaciones viendo la evidencia. | Administrador | ROL-10 | La decisión queda registrada y notificada. |
| F-903 | Reportar la conducta de otro miembro. | Cualquier miembro | SAN-07 | Llega al Capítulo o, si no existe, al administrador. |
| F-904 | Restar 20 puntos a un reporte con burla, desprecio o engaño. | Administrador y Capítulo | SAN-01 | El reporte se rechaza. |
| F-905 | Expulsar a un miembro, con apelación. | Administrador | EST-05 | Pasa al estado expulsado. |

#### M10. Estados e inactividad (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-1001 | Mantener los estados en espera, activo, inactivo y expulsado. | Sistema | EST-01 a EST-05 | Las transiciones siguen las reglas. |
| F-1002 | Avisar al administrador a los 60 días sin misión reportada. | Sistema | EST-03 | Aparece como notificación dentro de la app. |
| F-1003 | Pasar a inactivo a los 120 días, conservando rango y puntos. | Sistema | EST-03 | No se pierde nada. |
| F-1004 | Reactivar al reportar una misión o por decisión del administrador. | Sistema y administrador | EST-04 | Vuelve a activo. |

#### M11. Notificaciones dentro de la app (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-1101 | Notificar: título aprobado o rechazado, reporte validado o rechazado, puntos sumados, ascenso, sanción, apelación resuelta y nueva misión emergente. | Sistema | PRD-08 | No hay push, correo ni WhatsApp. |
| F-1102 | Notificar al administrador: reportes pendientes, apelaciones, reportes de conducta y alertas de inactividad. | Sistema | PRD-08, EST-03 | Se muestran en el panel. |

#### M12. Panel de administración web (P0 para título y validación; P1 para el resto)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-1201 | Gestionar miembros: ver, aprobar títulos, expulsar y reactivar. | Administrador | USU-06, EST-05 | Cada acción queda registrada. |
| F-1202 | Asignar el título de Capítulo. | Administrador | ROL-03 | Mientras nadie lo tenga, el administrador cumple esa función. |
| F-1203 | Buscar apologetas por rango, área, ciudad y actividad. | Administrador | Pantalla 3 del Excel | Los filtros se pueden combinar. |
| F-1204 | Ver reportes, fotos y crónicas. | Administrador y Capítulo | REP-07 | Solo estos roles. |
| F-1205 | Crear y editar misiones, con sus puntos y su tope mensual. | Administrador | ROL-07, ROL-08 | Un cambio no altera los puntos de reportes ya validados. |
| F-1206 | Definir la misión emergente del mes y su bono. | Administrador | ROL-11 | Aparece en el dashboard de los miembros. |
| F-1207 | Retirar contenido inapropiado y eliminar fichas. | Administrador | ROL-09 | Un miembro no puede hacerlo. |
| F-1208 | Administrar la tabla de escuelas. | Administrador | USU-14 | Empieza con una sola entrada. |
| F-1209 | Ver el registro de quién validó, rechazó o sancionó, y cuándo. | Administrador | — | Recomendado para auditoría; no es una regla de negocio. |

#### M13. Creación de misiones por miembros (P1)

| ID | Función | Quién | Reglas | Criterio de aceptación |
|---|---|---|---|---|
| F-1301 | Crear una misión nueva y fijar sus puntos. | Miembro de rango 5 en adelante | ROL-07, REP-09 | El tope mensual no lo fija quien la crea. |
| F-1302 | Tomar una misión del catálogo. | Miembro de rango 5 en adelante | REP-09 | Disponible según el rango mínimo. |

### 3. Qué se eliminó del Excel

| Elemento | Motivo |
|---|---|
| Pantalla de Bienvenida | Se desarrolla después (PRD-04). |
| Pantalla de Certificados (emisión de certificados de curso, de hito y de armadura) | La app no emite certificados (USU-15). |
| "Padrino asignado" del perfil, PRE-02 y el bono de equipo | No existe el padrino (USU-13). |
| FOR-01, FOR-03, FOR-04, FOR-05 y PRE-04 | Sin exámenes, sin curso propio de introducción, sin Historia de la Iglesia y sin validación de misiones por rango (USU-12, USU-16). |
| HIT-FUN (hito del rango 4) | Era un examen. |
| Enlace al curso y grupo de espera | Quien ingresa ya hizo el curso. |
| Rangos validadores | Validan solo el administrador y el Capítulo (ROL-05). |

### 4. Lo que no entra en la v1

Reuniones y calendario de grupos, ala de caridad femenina, ramas paralelas de rangos, donaciones y pagos, modo offline, buscador de contenido, formación dentro de la app, push, correo y WhatsApp.

---

## Parte 3. Reglas de negocio

Vigente al 2026-10-29. Reúne todas las reglas decididas para la v1. Cada una lleva su fuente y su estado.

**Regla para quien use este documento (incluida la IA):** si algo no está aquí ni en la sección "Reglas pendientes", no se supone ni se deduce: se pregunta al equipo de negocio.

**Fuentes:** "Excel" es CAI_Sistema_de_Rangos_y_Misiones.xlsx. "Decisión 2026-10-28" son las respuestas del cliente de esa fecha, registradas por el equipo de negocio. Los datos completos de misiones, rangos e hitos están en las partes 5 y 4.

### 1. Producto y alcance

| ID | Regla | Fuente |
|---|---|---|
| PRD-01 | CAI es una plataforma misionera católica, para católicos, que forma una comunidad misionera hispanohablante para actuar de forma coordinada, efectiva y visible. No es una organización ni un ministerio. | Decisión 2026-10-28 |
| PRD-02 | Los tres innegociables de la v1 son: registro con título del curso, mapa de apologetas y reporte de misiones. | Decisión 2026-10-28 |
| PRD-03 | También van en la v1: rangos, puntos e hitos con validación, mapa de sectas y bitácoras. | Decisión 2026-10-28 |
| PRD-04 | Quedan fuera de la v1: pantalla de Bienvenida, reuniones y calendario de grupos, ala de caridad femenina, ramas paralelas de rangos, donaciones y pagos, modo offline, buscador de contenido, formación dentro de la app, exámenes y padrinos. | Decisión 2026-11-07 |
| PRD-05 | Plataformas: iOS y Android; web si se puede. Preferencia híbrida. El panel de administración es web desde el inicio. | Decisión 2026-10-28 |
| PRD-06 | Idioma: solo español. | Decisión 2026-10-28 |
| PRD-07 | Meta de usuarios: 800 en los primeros seis meses. | Decisión 2026-10-28 |
| PRD-08 | Las notificaciones son solo dentro de la aplicación (sin push, correo ni WhatsApp). | Decisión 2026-10-28 |
| PRD-09 | No hay fecha objetivo, presupuesto ni medidor de éxito. El equipo de desarrollo trabaja de forma independiente, por versiones. | Decisión 2026-10-28 |

### 2. Usuarios e ingreso

| ID | Regla | Fuente |
|---|---|---|
| USU-01 | Los miembros son solo hombres. Se verifica por autodeclaración, sin validación. | Decisión 2026-10-28 |
| USU-02 | Edad mínima 18 años. No hay miembros menores; la regla R-05 del Excel deja de aplicar. | Decisión 2026-10-28 |
| USU-03 | Pueden entrar todos los hispanohablantes, incluidos España y Estados Unidos. | Decisión 2026-10-28 |
| USU-04 | Solo entra quien terminó el curso de apologética del Padre Luis Toro, que es la única escuela reconocida. Su certificado es la credencial de ingreso. Quien no lo terminó no puede entrar. | Decisión 2026-11-07 |
| USU-05 | El requisito de ingreso (HIT-ING) es solo el título del curso validado. Se eliminan la entrevista, la referencia de un miembro y los 30 días de formación inicial. | Decisión 2026-10-28 |
| USU-06 | La verificación del título es manual, a cargo del administrador. La automatización queda para el desarrollador. | Decisión 2026-10-28 |
| USU-07 | Un título rechazado se puede volver a presentar cuando la persona cumpla de nuevo el requisito, sin fallos. No hay límite de intentos ni plazo. | Decisión 2026-10-28 |
| USU-08 | Se identifica con correo electrónico o teléfono. | Decisión 2026-10-28 |
| USU-09 | La ubicación se guarda por GPS y por ciudad escrita (ambos). | Decisión 2026-10-28 |
| USU-10 | Datos de registro obligatorios: nombres y apellidos; correo o teléfono; contraseña; fecha de nacimiento; declaración de ser hombre; país, estado o región y ciudad; ubicación GPS; parroquia; nombre del sacerdote de su parroquia (no es usuario de la app); escuela y fecha de graduación; título del curso (foto o PDF); aceptación de términos, privacidad y código de conducta. | Decisión 2026-10-28 |
| USU-11 | Datos de registro opcionales: foto de perfil, diócesis, comunidad o movimiento, contacto de emergencia, WhatsApp. | Decisión 2026-10-28 |
| USU-12 | No hay exámenes en la plataforma. Se eliminan FOR-03, FOR-04 y los exámenes de HIT-FUN y HIT-CAB. | Decisión 2026-11-07 |
| USU-13 | No existe la figura del padrino. Se elimina PRE-02, el "padrino asignado" del perfil y la función de apadrinar del Caballero del Temple. | Decisión 2026-11-07 |
| USU-14 | Se recomienda mantener una tabla de escuelas con una sola entrada (el curso del Padre Luis Toro), para poder agregar otras sin cambiar el código. | Decisión 2026-11-07 |
| USU-15 | La app no emite certificados (de curso, de hito ni de armadura). Solo recibe y valida el certificado del curso del Padre Luis Toro al ingresar. Se elimina la pantalla "Certificados" del Excel. | Decisión 2026-11-07 |
| USU-16 | Se eliminan también FOR-01 (curso de introducción de la Orden), FOR-05 (módulo de Historia de la Iglesia) y el hito HIT-FUN del rango 4. FOR-07 y FOR-08 se mantienen: su evidencia es el certificado de una institución externa, que el miembro sube como evidencia de una misión. | Decisión 2026-11-07 |

### 3. Roles y permisos

| ID | Regla | Fuente |
|---|---|---|
| ROL-01 | El administrador gestiona y valida. No hay máximo de administradores. Puede ser una mujer, con los mismos permisos. | Decisión 2026-10-28 |
| ROL-02 | El primer administrador es la primera persona a quien se entregan las credenciales de administrador. | Decisión 2026-10-28 |
| ROL-03 | El Capítulo es un título que asigna el administrador a una o más personas. No hay máximo de integrantes. Mientras no exista nadie con ese título, el administrador cumple esa función. | Decisión 2026-10-28 |
| ROL-04 | El Capítulo y el administrador son los dos títulos más altos dentro de la app. | Decisión 2026-10-28 |
| ROL-05 | Validan solo el administrador y el Capítulo. En la v1 no hay rangos validadores. | Decisión 2026-10-28 |
| ROL-06 | Los primeros integrantes del Capítulo y el primer Gran Maestre los asigna el dueño, Carlos Amariles. | Decisión 2026-10-28 |
| ROL-07 | Pueden crear misiones nuevas el administrador y los miembros de rango 5 en adelante. Quien la crea fija sus puntos. | Decisión 2026-11-05 |
| ROL-08 | El tope mensual de una misión lo fija el sistema o el administrador, nunca quien crea la misión ni el Capítulo. | Decisión 2026-10-28 |
| ROL-09 | Solo el administrador puede eliminar fichas de sectas y retirar contenido inapropiado. Los miembros no. | Decisión 2026-10-28 |
| ROL-10 | El administrador resuelve las apelaciones, viendo la evidencia. | Decisión 2026-10-28 |
| ROL-11 | El administrador define la misión emergente del mes y su bono. | Decisión 2026-10-28 |
| ROL-12 | El rango 10 (Gran Maestre) lo registra el administrador tras una elección que se hace fuera de la app. | Decisión 2026-10-28 |

### 4. Estados del miembro

| ID | Regla | Fuente |
|---|---|---|
| EST-01 | Estados: en espera, activo, inactivo y expulsado. | Decisión 2026-10-28 |
| EST-02 | En espera pasa a activo cuando el administrador aprueba el título. | Propuesta aprobada por delegación |
| EST-03 | Activo pasa a inactivo a los 120 días sin misión reportada. A los 60 días la app avisa al administrador. Se conservan rango y puntos. | Excel R-11 y propuesta aprobada |
| EST-04 | Inactivo vuelve a activo al reportar una misión o cuando lo reactiva el administrador. | Propuesta aprobada por delegación |
| EST-05 | Activo o inactivo pasa a expulsado solo por decisión del administrador, con botón de apelación. | Propuesta aprobada por delegación |

### 5. Misiones y reportes

| ID | Regla | Fuente |
|---|---|---|
| REP-01 | Toda misión exige evidencia que se sube a la app, siempre que sea posible. | Decisión 2026-10-28 |
| REP-02 | La evidencia es foto y, en algunos casos, video. La foto incluye al interlocutor. Una casilla, que toca el interlocutor al tomar o subir la foto, registra su consentimiento. Sin consentimiento solo se admite bitácora escrita. | Decisión 2026-10-28 y Excel R-03 |
| REP-03 | Evidencia de Vida interior: VIG-01 y VIG-06, registro en la app; VIG-03, foto del lugar con fecha o, si no es posible, registro; VIG-05, registro vinculado al código de la misión; VIG-02 (confesión), registro de honor sin constancia, con puntos completos, por el sigilo sacramental. | Decisión 2026-10-28 |
| REP-04 | Las crónicas escritas son opcionales y van siempre acompañadas de fotos. | Decisión 2026-10-28 |
| REP-05 | La subida no tiene plazo. La fecha de la misión puede ser de hasta dos semanas antes del reporte. | Decisión 2026-10-28 |
| REP-06 | Toda misión de campo lleva al menos dos miembros. El compañero de misión es obligatorio y se elige de la lista de miembros. | Excel R-07 |
| REP-07 | Los reportes, fotos y crónicas los ven solo el administrador y el Capítulo. No hay muro ni feed público. | Decisión 2026-10-28 |
| REP-08 | Al subir una evidencia entre las 20:00 y las 06:00 la app muestra una advertencia de que a esa hora no se puede hacer la misión. No es necesario bloquear el envío. | Decisión 2026-10-28 |
| REP-09 | Las misiones nuevas las generan el administrador y los miembros de rango 5 en adelante. Desde el rango 5 también se puede tomar una misión del catálogo. | Decisión 2026-11-05 |
| REP-10 | DEB-04 y EST-05 exigen adjuntar la invitación escrita antes de poder enviarse. | Excel R-08 |
| REP-11 | Un reporte que mencione menores pasa a revisión del administrador. | Excel R-04 |
| REP-12 | El campo de nombre del interlocutor es opcional y nunca público. | Excel R-06 |

### 6. Validación y puntos

| ID | Regla | Fuente |
|---|---|---|
| PTS-01 | Los puntos se suman cuando el validador marca la misión como exitosa y correcta. | Decisión 2026-10-28 |
| PTS-02 | No hay plazo para validar: se valida cuando la persona pueda. | Decisión 2026-10-28 |
| PTS-03 | Todos los que participan en la misión reciben puntos. | Decisión 2026-10-28 |
| PTS-04 | Los puntos se suman al participante que ayuda aunque haya alcanzado su tope mensual. | Decisión 2026-10-28 |
| PTS-05 | Los puntos no caducan. | Decisión 2026-10-28 |
| PTS-06 | Cuando se quitan puntos, solo se restan los sancionados (100 menos 10 queda en 90). Nadie llega a cero. | Decisión 2026-10-28 |
| PTS-07 | Los bonos por misión no se acumulan entre sí. Cuando coinciden varios, se aplica el de mayor valor. El bono de ascenso es aparte (inferido; confirmar). | Decisión 2026-10-28 |
| PTS-08 | Valores de los bonos: constancia +25 (cuatro semanas seguidas con una misión validada), primicia +25, calidad +20% de la misión. El bono de equipo (+15) se eliminó porque dependía del padrino. | Excel y decisión 2026-11-07 |
| PTS-09 | Tope mensual "—": sin tope (misión repetible) o una sola vez (misión "Una vez"). La regulación de topes queda para versiones posteriores. | Decisión 2026-10-28 |
| PTS-10 | El factor de autoreporte (x0,5) se elimina. | Decisión 2026-10-28 |
| PTS-11 | Los hitos otorgan puntos (ver "Rangos, hitos y economía de puntos.md"). | Excel |
| PTS-12 | Cuenta como actividad una misión reportada (para los tres meses de HIT-CAB y para los avisos de inactividad). | Decisión 2026-10-28 |

### 7. Ascenso

| ID | Regla | Fuente |
|---|---|---|
| ASC-01 | Para subir hacen falta dos llaves a la vez: los puntos del umbral y el hito obligatorio del rango. El rango 4 no tiene hito: se asciende a él por puntos y por la misión de Hospitalidad (ASC-03). | Excel y decisión 2026-11-07 |
| ASC-02 | Los hitos son validados por el administrador o el Capítulo. Las actas que el Excel pedía a un rango 7 o superior las firma el Capítulo. | Decisión 2026-10-28 |
| ASC-03 | Hospitalidad (R-10): para ascender al rango 4 y a los siguientes se exige una misión de Hospitalidad validada en los últimos 90 días. | Decisión 2026-10-28 |
| ASC-04 | Quien baja de rango pierde el hito del rango perdido. Conserva sus puntos (menos los quitados) y debe cumplir el hito otra vez para volver a subir (inferido de ASC-01; confirmar). | Decisión 2026-10-28 |
| ASC-05 | El rango 10 no se alcanza por puntos: lo da la elección del Capítulo General. El Voto de Fidelidad no es una misión, no otorga puntos y no aparece en ninguna barra de progreso. | Excel |
| ASC-06 | Los puntos de ascenso (bono) se otorgan al llegar al rango y suman al acumulado. | Excel |

### 8. Sanciones y conducta

| ID | Regla | Fuente |
|---|---|---|
| SAN-01 | Regla de oro (R-01): toda misión se hace y se reporta con mansedumbre y respeto. Un reporte con burla, desprecio o engaño se rechaza y resta 20 puntos. Casilla obligatoria antes de enviar. | Excel |
| SAN-02 | Ningún punto por riesgo (R-02): ninguna misión otorga puntos por riesgo físico, por entrar a propiedad privada sin invitación, ni por actuar de noche o a solas en un lugar inseguro. | Excel |
| SAN-03 | Nunca con menores ni vulnerables (R-04): no se aborda a menores ni, con fines de debate, a personas en duelo, en crisis o enfermas. | Excel |
| SAN-04 | Contra el error, nunca contra la persona (R-06): prohibido publicar nombre, foto o dirección de un interlocutor sin su permiso escrito. | Excel |
| SAN-05 | Evidencia falsa (R-09): se rechaza con motivo y se pierden solo los puntos de ese reporte. A la segunda vez, que cuenta de forma permanente sin ventana de tiempo, baja un rango. Hay aviso al administrador. | Decisión 2026-10-28 |
| SAN-06 | Hay un botón de apelación. Decide el administrador, viendo la evidencia. | Decisión 2026-10-28 |
| SAN-07 | El rango no es mérito propio (R-12): un rango alto que humilla a un rango bajo pierde su rango. Hay un botón de reporte de conducta visible para cualquier rango. Llega al Capítulo, o al administrador mientras no exista. | Excel y decisión |

### 9. Grupos

| ID | Regla | Fuente |
|---|---|---|
| GRP-01 | Un grupo es un conjunto de miembros con un líder que organiza la misión. Los participantes no necesitan un rango específico. | Decisión 2026-10-28 |
| GRP-02 | No cualquiera puede ser líder: depende del rango, con los límites del Excel. Rangos 1 a 3 no lideran. Rango 4, escuadra de 2 a 3 miembros. Rango 5, pelotón de hasta 8 y organiza misiones propias. Rango 6, encomienda local y autoriza misiones de campo en su zona. Rango 7, rol académico, no ejecutivo. Rango 8, campañas fuera de la ciudad base. | Decisión 2026-10-28 y Excel |
| GRP-03 | El Postulante no sale a campo. El rango 2 sale acompañado de un rango 4 o superior. | Excel |

### 10. Mapa y fichas de sectas

| ID | Regla | Fuente |
|---|---|---|
| MAP-01 | El mapa muestra el conteo por país, estado y ciudad, tanto de apologetas como de sectas. | Decisión 2026-10-28 |
| MAP-02 | La ficha de una secta lleva nombre, dirección, coordenadas, foto y rama (pentecostal, metodista, anglicana, etc.). No lleva descripción doctrinal. La rama es texto libre. | Decisión 2026-10-28 |
| MAP-03 | La ficha aparece en el mapa apenas se sube, sin aprobación previa. Cualquier persona puede verlas; para crearlas hace falta una cuenta registrada. | Decisión 2026-11-05 |
| MAP-04 | Los puntos de CAR-01 se dan solo cuando el administrador valida la misión. | Decisión 2026-10-28 |

### 11. Reglas pendientes (no suponer)

| ID | Qué falta | Quién responde |
|---|---|---|
| PEN-01 | **Resuelta 2026-11-07.** La única escuela reconocida es el curso del Padre Luis Toro. | — |
| PEN-02 | **Resuelta 2026-11-07.** No hay exámenes en la plataforma. | — |
| PEN-03 | **Resuelta 2026-11-07.** No existe el padrino. | — |
| PEN-04 | **Resuelta 2026-11-05.** Se quitó la encomienda local de HIT-COM y se exigen cuatro misiones lideradas (EST-02). | — |
| PEN-05 | **Resuelta 2026-11-05.** Todos los miembros de rango 5 en adelante pueden crear misiones. | — |
| PEN-06 | Permisos del Capítulo además de validar (sancionar, expulsar, resolver apelaciones, aprobar títulos, eliminar contenido): **los define el desarrollador**. | Desarrollador |
| PEN-07 | **Resuelta 2026-11-05.** Crear una ficha de secta exige una cuenta registrada. | — |
| PEN-08 | Método automático de verificación del título del curso. | Desarrollador |
| PEN-09 | Límite de tamaño y duración de videos, y tiempo de almacenamiento. | Desarrollador |
| PEN-10 | Ley de protección de datos aplicable, borrado de cuenta, datos sensibles (fe y parroquia), validez de la casilla de consentimiento, fichas públicas de lugares de culto. | Consulta legal |
| PEN-11 | Logo. | Cliente |
| PEN-12 | **Resuelta 2026-11-07.** Se elimina HIT-FUN: el rango 4 no tiene hito. | — |
| PEN-13 | **Resuelta 2026-11-07.** Se elimina FOR-01. | — |
| PEN-14 | **Resuelta 2026-11-07.** Se elimina el bono de equipo. | — |
| PEN-15 | **Resuelta 2026-11-07.** Se elimina FOR-05. | — |
| PEN-16 | **Resuelta 2026-11-07.** La app no emite certificados. | — |

---

## Parte 4. Rangos, hitos y economía de puntos

Fuente: CAI_Sistema_de_Rangos_y_Misiones.xlsx (hojas Rangos, Hitos y Economia de puntos), con los cambios acordados el 2026-10-28. Los escudos (descripción gráfica) están en la hoja Rangos del Excel y no se repiten aquí.

### Los diez rangos

| Nº | Rango | Lema | Puntos desde | Puntos hasta | Bono de ascenso | Hito para alcanzarlo | Mando y funciones |
|---|---|---|---|---|---|---|---|
| 1 | Postulante | «Primum audire» | 0 | 0 | 0 | HIT-ING | En formación y discernimiento. No sale a misión de campo. Estudio, oración, caridad y las primeras conversaciones dentro de su propia casa. |
| 2 | Compañero de Armas | «Domus prima acies» | 1 | 100 | 10 | HIT-DOM | Infantería de la Orden. Su campo es su casa y su barrio. Sale a campo acompañado de un rango 4 o superior. |
| 3 | Escudero | «Proximus meus, prima missio» | 101 | 300 | 20 | HIT-PROX | Apoyo doctrinal a la comunidad. Puede abrir fichas de secta y salir a la calle acompañado. Primer rango con misiones de contenido. |
| 4 | Sargento de Armas | «Fundamenta teneo» | 301 | 650 | 35 | — (sin hito; ver ASC-03) | Mando de escuadra, de dos a tres miembros. Primer rango autorizado a debatir, en formato informal. |
| 5 | Caballero del Temple | «Non nobis, Domine» | 651 | 1200 | 60 | HIT-CAB | Mando de pelotón, hasta ocho miembros. Organiza misiones propias y debates formales. |
| 6 | Comendador | «Custos doctrinae» | 1201 | 2000 | 90 | HIT-COM | Mando de encomienda local. Autoriza misiones de campo en su zona. Rol ejecutivo. |
| 7 | Preceptor | «Doce ut credant» | 2001 | 3200 | 130 | HIT-PRE | Cátedra de la Orden. Diseña la formación, certifica, supervisa el contenido y las redes. Rol académico, no ejecutivo. |
| 8 | Mariscal | «Ubi mittor, eo» | 3201 | 5000 | 180 | HIT-MAR | Mando itinerante. Dirige campañas fuera de la ciudad base y representa a la Orden ante otras comunidades. |
| 9 | Senescal | «Veritas in caritate» | 5001 | 7500 | 250 | HIT-SEN | Segundo del Gran Maestre. Preside el Capítulo en su ausencia. |
| 10 | Gran Maestre | «Servus servorum veritatis» | 7501 | sin techo | 350 | HIT-GM | Cabeza de la Orden. Único rango electivo. |

Las funciones de validación que el Excel daba a los rangos 4, 6 y 9 quedan sustituidas: valida el administrador o el Capítulo (regla ROL-05).

### Hitos

Sin el hito no hay ascenso, por muchos puntos que se acumulen. Desde el ascenso al rango 4 se exige además una misión de Hospitalidad validada en los últimos 90 días (regla ASC-03).

| Código | Hito | Abre el rango | Requisito (con los cambios) | Evidencia | Puntos |
|---|---|---|---|---|---|
| HIT-ING | Aprobación de ingreso | 1 | Título del curso de apologética validado. | Título validado por el administrador | — |
| HIT-DOM | La Misión Doméstica | 2 | PRX-01 y PRX-02 completadas y validadas. | Bitácoras validadas | 25 |
| HIT-PROX | Evangelización de Proximidad | 3 | PRX-03 y CAR-01 completadas y validadas. | Bitácora y ficha en el mapa | 40 |
| HIT-FUN | Vigilia de Fundamentos | 4 | **Eliminado el 2026-11-07.** Era un examen y no hay exámenes. El rango 4 se alcanza por puntos y por la misión de Hospitalidad. | — | — |
| HIT-CAB | Vigilia de Armas | 5 | Una misión de campo liderada (EST-02) y tres meses consecutivos de actividad (misión reportada). Se profesa ante el Capítulo. | Acta firmada por el Capítulo | 100 |
| HIT-COM | La Encomienda | 6 | Cuatro misiones de campo lideradas (EST-02). Se quitó el requisito de la encomienda local el 2026-11-05. | Informes de misión | 150 |
| HIT-PRE | La Cátedra | 7 | Diseñar y dictar un módulo formativo aprobado por el Capítulo (PRE-03 y PRE-01). | Material aprobado y grabación de la clase | 200 |
| HIT-MAR | La Campaña Itinerante | 8 | Haber sido invitado y haber expuesto en tres congregaciones de otra confesión, en ciudades o barrios distintos (DEB-04 por tres). | Tres invitaciones escritas y tres grabaciones | 300 |
| HIT-SEN | El Gran Debate | 9 | Organizar y sostener un debate público frente a cinco o más interlocutores simultáneos (DEB-06). | Grabación completa y acta del Capítulo | 400 |
| HIT-GM | Elección del Capítulo General | 10 | Trayectoria completa, una obra de la Orden fundada y sostenida, y profesión del Voto de Fidelidad. No es una misión: es una elección. | Registro del administrador tras la elección | — |

Suma de los puntos de hitos: 1215 (nueve hitos vigentes; HIT-FUN se eliminó).

### Economía de puntos

Los supuestos de ritmo del Excel son 6 misiones validadas por mes y 45 puntos por misión, es decir 270 puntos al mes.

| Rango | Nivel | Umbral | Puntos del tramo | Bono de ascenso | Meses del tramo | Meses acumulados |
|---|---|---|---|---|---|---|
| Postulante | 1 | 0 | 0 | 0 | 0 | 0 |
| Compañero de Armas | 2 | 1 | 1 | 10 | 0 | 0 |
| Escudero | 3 | 101 | 100 | 20 | 0,4 | 0,4 |
| Sargento de Armas | 4 | 301 | 200 | 35 | 0,7 | 1,1 |
| Caballero del Temple | 5 | 651 | 350 | 60 | 1,3 | 2,4 |
| Comendador | 6 | 1201 | 550 | 90 | 2,0 | 4,4 |
| Preceptor | 7 | 2001 | 800 | 130 | 3,0 | 7,4 |
| Mariscal | 8 | 3201 | 1200 | 180 | 4,4 | 11,8 |
| Senescal | 9 | 5001 | 1800 | 250 | 6,7 | 18,5 |
| Gran Maestre | 10 | 7501 | 2500 | 350 | 9,3 | 27,8 |

El total de bonos de ascenso es 1125 (es el número que el Excel muestra, sin rótulo, en la fila "Camino completo"). El tiempo estimado de 27,8 meses no descuenta bonos ni puntos de hitos.

### Bonos y factores

| Bono | Valor | Cuándo se aplica |
|---|---|---|
| Constancia | +25 puntos | Cuatro semanas seguidas con al menos una misión validada. |
| Equipo | Eliminado | Se eliminó el 2026-11-07 porque dependía del padrino. |
| Primicia | +25 puntos | Primera ficha de una secta nunca antes registrada en el mapa. |
| Calidad | +20% de la misión | Evidencia calificada como excelente por el validador. |
| Ascenso | Según la tabla de rangos | Al alcanzar cada rango; suma al acumulado. |

Los bonos por misión no se acumulan entre sí: si coinciden varios, se aplica el de mayor valor. El factor de autoreporte (x0,5) se eliminó.

---

## Parte 5. Catálogo de misiones

Fuente: CAI_Sistema_de_Rangos_y_Misiones.xlsx, hoja "Misiones", con los cambios acordados el 2026-10-28 y el 2026-11-07. Son **47 misiones** y **4635 puntos** de catálogo. "—" en el tope significa sin tope (misión repetible) o una sola vez (misión "Una vez"); la regulación de topes queda para versiones posteriores.

Cambios respecto al Excel: PRX-02 baja a rango 1; PRE-03 baja a rango 6; EST-02 baja a rango 4 y se renombra; se eliminan PRE-04 (validar y certificar misiones), PRE-02 (apadrinar, porque no habrá padrino), FOR-03 y FOR-04 (exámenes, porque no se manejan exámenes), FOR-01 (curso de introducción de la Orden, redundante con el curso de ingreso) y FOR-05 (módulo de Historia de la Iglesia); evidencias de CAR-01, VIG-02, VIG-03, VIG-05, PRX-04 y HOS-03 ajustadas. Detalle en "Reglas de negocio.md".

### Misiones

| Código | Misión | Categoría | Área | Puntos | Evidencia exigida | Rango mínimo | Repetible | Tope mensual |
|---|---|---|---|---|---|---|---|---|
| FOR-02 | Leer un libro de apologética y subir una ficha de una página | Formación | El Scriptorium | 40 | Ficha en PDF: tesis, tres argumentos, tres objeciones | 1 | Sí | 120 |
| FOR-06 | Estudio monográfico de una secta: 10 páginas con fuentes | Formación | El Scriptorium | 70 | Documento en PDF con bibliografía | 3 | Sí | 140 |
| FOR-07 | Certificación externa en teología, filosofía o Sagrada Escritura | Formación | El Scriptorium | 150 | Certificado de la institución | 5 | Sí | — |
| FOR-08 | Curso de oratoria y técnica de debate | Formación | El Scriptorium | 80 | Certificado del curso | 4 | Una vez | — |
| VIG-01 | Racha de 7 días de oración registrada | Vida interior | La Vigilia | 15 | Registro diario en la aplicación | 1 | Sí | 60 |
| VIG-02 | Confesión del mes | Vida interior | La Vigilia | 20 | Registro de honor en la aplicación (sin constancia, por el sigilo sacramental) | 1 | Mensual | 20 |
| VIG-03 | Una hora de adoración eucarística | Vida interior | La Vigilia | 15 | Foto del lugar con fecha; si no es posible, registro en la aplicación | 1 | Sí | 60 |
| VIG-04 | Retiro espiritual de un día o más | Vida interior | La Vigilia | 60 | Constancia del retiro o fotografía | 2 | Sí | 60 |
| VIG-05 | Ayuno ofrecido por una misión concreta de la Orden | Vida interior | La Vigilia | 20 | Registro en la aplicación vinculado al código de esa misión | 2 | Sí | 40 |
| VIG-06 | Rosario semanal por los interlocutores de la Orden | Vida interior | La Vigilia | 10 | Registro en la aplicación | 1 | Sí | 40 |
| PRX-01 | Conversación apologética documentada con un familiar | Proximidad | Las Primeras Batallas | 30 | Bitácora: quién, objeción planteada, respuesta dada, resultado | 1 | Sí | 90 |
| PRX-02 | Catequesis familiar sostenida durante cuatro semanas | Proximidad | Las Primeras Batallas | 70 | Bitácora semanal con temas tratados | 1 | Sí | 70 |
| PRX-03 | Conversación apologética con un vecino o conocido no católico | Proximidad | Las Primeras Batallas | 30 | Bitácora con el mismo formato | 2 | Sí | 90 |
| PRX-04 | Acompañar a una persona alejada de vuelta a los sacramentos | Proximidad | Las Primeras Batallas | 150 | Testimonio escrito y validación del administrador o del Capítulo | 2 | Sí | — |
| PRX-05 | Inscribir a tres personas en el curso de la Orden | Proximidad | Las Primeras Batallas | 40 | Registro de inscripción en la plataforma | 2 | Sí | 80 |
| CAR-01 | Registrar en el mapa una secta local todavía no fichada | Cartografía | El Mapa | 45 | Ficha completa: nombre, dirección, coordenadas, rama y fotografía de fachada | 2 | Sí | 180 |
| CAR-02 | Verificar y actualizar una ficha existente | Cartografía | El Mapa | 15 | Nota de verificación fechada | 2 | Sí | 60 |
| CAR-03 | Ficha doctrinal comparada: tesis del grupo frente a respuesta católica | Cartografía | El Mapa | 70 | Documento con fuentes de ambas partes | 3 | Sí | 140 |
| CAR-04 | Mapeo completo de un barrio o municipio | Cartografía | El Mapa | 120 | Informe y puntos cargados en el mapa | 4 | Sí | 120 |
| ESC-01 | Responder una visita de proselitismo en la puerta de casa | Apologética de campo | La Escaramuza | 25 | Bitácora de la conversación | 2 | Sí | 100 |
| ESC-02 | Conversación apologética en la calle o en una plaza | Apologética de campo | La Escaramuza | 35 | Bitácora y firma del compañero de misión | 3 | Sí | 140 |
| ESC-03 | Jornada de mesa apologética en vía pública, tres horas | Apologética de campo | La Escaramuza | 80 | Fotografías de la mesa y bitácora de conversaciones | 3 | Sí | 160 |
| ESC-04 | Responder objeciones en un espacio público adverso, con mansedumbre documentada | Apologética de campo | La Escaramuza | 60 | Bitácora y testimonio de un testigo de la Orden | 4 | Sí | 120 |
| ESC-05 | Acompañar a un hermano de rango menor en su primera salida de campo | Apologética de campo | La Escaramuza | 40 | Bitácora de ambos | 4 | Sí | 120 |
| DEB-01 | Debate informal, uno contra uno, con un creyente de otra confesión | Debate | El Campo de Batalla | 60 | Grabación con consentimiento, o acta firmada por ambos | 4 | Sí | 180 |
| DEB-02 | Debate formal público, uno contra uno, con un pastor o líder | Debate | El Campo de Batalla | 150 | Grabación completa del debate | 5 | Sí | — |
| DEB-03 | Debate formal frente a dos o más interlocutores | Debate | El Campo de Batalla | 220 | Grabación completa del debate | 5 | Sí | — |
| DEB-04 | Exponer en el templo o local de otra confesión, por invitación escrita | Debate | El Campo de Batalla | 250 | Grabación y copia de la invitación | 6 | Sí | — |
| DEB-05 | Moderar un debate de la Orden | Debate | El Campo de Batalla | 90 | Grabación y acta de moderación | 6 | Sí | 180 |
| DEB-06 | Sostener un debate frente a cinco o más interlocutores simultáneos | Debate | El Campo de Batalla | 400 | Grabación completa y acta del Capítulo | 8 | Sí | — |
| HER-01 | Publicar una pieza apologética breve: post, reel o hilo | Contenido y difusión | El Heraldo | 20 | Enlace público a la publicación | 3 | Sí | 120 |
| HER-02 | Publicar un vídeo apologético de más de cinco minutos | Contenido y difusión | El Heraldo | 50 | Enlace público al vídeo | 3 | Sí | 150 |
| HER-03 | Publicar un artículo o ensayo apologético | Contenido y difusión | El Heraldo | 70 | Enlace o PDF publicado | 4 | Sí | 140 |
| HER-04 | Completar una serie de ocho piezas sobre un mismo tema | Contenido y difusión | El Heraldo | 140 | Enlaces a las ocho piezas | 4 | Sí | 140 |
| HER-05 | Bono: una pieza supera las 10.000 visualizaciones | Contenido y difusión | El Heraldo | 100 | Captura de las métricas | 3 | Sí | 200 |
| HER-06 | Subir a la Orden un debate editado y con sus fichas de respuesta | Contenido y difusión | El Heraldo | 90 | Enlace al vídeo y fichas en PDF | 5 | Sí | 180 |
| PRE-01 | Dictar una charla formativa a miembros de la Orden | Formación de otros | La Preceptoría | 70 | Grabación o acta con lista de asistentes | 5 | Sí | 210 |
| PRE-03 | Diseñar un módulo de formación aprobado por el Capítulo | Formación de otros | La Preceptoría | 200 | Material completo y acta de aprobación | 6 | Sí | — |
| EST-01 | Organizar una misión de la Orden: convocatoria, logística y cierre | Mando y organización | El Estandarte | 80 | Informe de misión con asistentes y resultado | 5 | Sí | 240 |
| EST-02 | Liderar un grupo en una jornada de campo, tres miembros o más | Mando y organización | El Estandarte | 100 | Informe firmado por los miembros del grupo | 4 | Sí | 200 |
| EST-03 | Organizar un debate público completo | Mando y organización | El Estandarte | 200 | Informe de organización y grabación del debate | 6 | Sí | — |
| EST-04 | Fundar y sostener una encomienda local durante seis meses | Mando y organización | El Estandarte | 350 | Informe semestral y registro de miembros activos | 7 | Sí | — |
| EST-05 | Organizar una campaña itinerante en otra ciudad | Mando y organización | El Estandarte | 300 | Informe de campaña con resultados y asistentes | 8 | Sí | — |
| HOS-01 | Obra de misericordia corporal documentada | Caridad | La Hospitalidad | 25 | Bitácora: qué se hizo, a quién, cuándo | 1 | Sí | 100 |
| HOS-02 | Jornada de servicio a pobres o enfermos, cuatro horas | Caridad | La Hospitalidad | 50 | Fotografías y bitácora de la jornada | 1 | Sí | 150 |
| HOS-03 | Acompañamiento sostenido a una persona o familia en necesidad, tres meses | Caridad | La Hospitalidad | 150 | Bitácora mensual y validación del administrador o del Capítulo | 3 | Sí | — |
| HOS-04 | Organizar una obra de caridad de la Orden | Caridad | La Hospitalidad | 180 | Informe con beneficiarios y participantes | 5 | Sí | — |

### Resumen por categoría

| Categoría | Nº de misiones | Puntos del catálogo | Puntos promedio |
|---|---|---|---|
| Formación | 4 | 340 | 85 |
| Vida interior | 6 | 140 | 23 |
| Proximidad | 5 | 320 | 64 |
| Cartografía | 4 | 250 | 63 |
| Apologética de campo | 5 | 240 | 48 |
| Debate | 6 | 1170 | 195 |
| Contenido y difusión | 6 | 470 | 78 |
| Formación de otros | 2 | 270 | 135 |
| Mando y organización | 5 | 1030 | 206 |
| Caridad | 4 | 405 | 101 |
| **Total** | **47** | **4635** | |

### Misiones disponibles por rango

Un rango puede reportar toda misión cuyo rango mínimo sea igual o inferior al suyo.

| Rango | Formación | Vida interior | Proximidad | Cartografía | Apologética de campo | Debate | Contenido y difusión | Formación de otros | Mando y organización | Caridad | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 4 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 9 |
| 2 | 1 | 6 | 5 | 2 | 1 | 0 | 0 | 0 | 0 | 2 | 17 |
| 3 | 2 | 6 | 5 | 3 | 3 | 0 | 3 | 0 | 0 | 3 | 25 |
| 4 | 3 | 6 | 5 | 4 | 5 | 1 | 5 | 0 | 1 | 3 | 33 |
| 5 | 4 | 6 | 5 | 4 | 5 | 3 | 6 | 1 | 2 | 4 | 40 |
| 6 | 4 | 6 | 5 | 4 | 5 | 5 | 6 | 2 | 3 | 4 | 44 |
| 7 | 4 | 6 | 5 | 4 | 5 | 5 | 6 | 2 | 4 | 4 | 45 |
| 8 | 4 | 6 | 5 | 4 | 5 | 6 | 6 | 2 | 5 | 4 | 47 |
| 9 | 4 | 6 | 5 | 4 | 5 | 6 | 6 | 2 | 5 | 4 | 47 |
| 10 | 4 | 6 | 5 | 4 | 5 | 6 | 6 | 2 | 5 | 4 | 47 |

---

## Parte 6. Huecos técnicos para el equipo

Fecha: 2026-11-07. Lo que el equipo debe decidir o resolver al construir la v1, más unas definiciones menores de negocio que el cliente no fijó y para las que se propone un valor por defecto. Las reglas están en la parte 3 y las funciones en la parte 2.

### A. Decisiones técnicas del equipo

| ID | Tema | Qué hay que resolver | Regla o función |
|---|---|---|---|
| H-01 | Stack | Tecnología para la app híbrida (iOS y Android, y web si se puede), el panel web, el servidor, la base de datos y el almacenamiento. El cliente prefiere app híbrida. | PRD-05 |
| H-02 | Acceso | Registro y acceso con correo o teléfono, verificación del contacto y recuperación de contraseña. Autenticación reforzada para el panel de administración. | USU-08, F-110 |
| H-03 | Roles y permisos | Modelo de administrador, Capítulo y miembro. El equipo define los permisos del Capítulo además de validar. | ROL-03, PEN-06 |
| H-04 | Fotos y videos | Límite de tamaño y duración, compresión, tiempo de almacenamiento y subida que se reanude con conexión débil. La evidencia solo la ven el administrador y el Capítulo. | PEN-09, REP-07 |
| H-05 | Mapa | Proveedor de mapas, conteo por país, estado y ciudad, y cómo se reconcilian el GPS y la ciudad escrita. Catálogo de países, estados y ciudades frente a texto libre. No exponer la posición exacta de los miembros. | MAP-01, USU-09 |
| H-06 | Fichas de sectas | Detectar duplicados para el bono de primicia, limitar la frecuencia de subida y facilitar que el administrador elimine una ficha. Las fichas son públicas y no tienen aprobación previa. | MAP-02, MAP-03 |
| H-07 | Motor de puntos | Sumar al validar, revertir al sancionar, nunca llegar a cero, conservar el historial de cada movimiento y evitar dobles sumas si dos validadores actúan a la vez. | PTS-01 a PTS-06 |
| H-08 | Topes y bonos | Calcular los topes mensuales, la excepción de quien ayuda, y el bono de mayor valor cuando coinciden varios. | PTS-04, PTS-07 |
| H-09 | Ascenso y descenso | Evaluar puntos, hito y Hospitalidad de los últimos 90 días; retirar el hito al bajar de rango. | ASC-01 a ASC-04 |
| H-10 | Máquinas de estado | Estados y transiciones de miembro, reporte, apelación y título. | EST-01 a EST-05 |
| H-11 | Tareas programadas | Alerta a los 60 días, inactivo a los 120, ventana de 90 días de Hospitalidad y bono de constancia. | EST-03, ASC-03 |
| H-12 | Notificaciones | Diseño de las notificaciones dentro de la app, sin push, correo ni WhatsApp. | PRD-08 |
| H-13 | Zonas horarias | Hora del miembro para los reportes, la advertencia nocturna y los topes. Fechas de misión hasta dos semanas antes. | REP-05, REP-08 |
| H-14 | Auditoría | Registro inmutable de validaciones, rechazos, sanciones, apelaciones y eliminaciones. | F-1209 |
| H-15 | Datos personales | Ley aplicable, la fe y la parroquia como datos sensibles, borrado de cuenta (qué pasa con sus reportes y puntos), términos y privacidad. Consulta legal. | PEN-10 |
| H-16 | Consentimiento | Guardar la casilla del interlocutor junto al reporte, con fecha. Falta validación legal de si basta. | REP-02 |
| H-17 | Tiendas de aplicaciones | Las tiendas suelen exigir mecanismos de reporte y moderación para contenido de usuarios. Revisar sus políticas por las fichas públicas y los reportes. | MAP-03 |
| H-18 | Verificación del título | Hoy es manual. Diseñar el flujo para poder automatizarlo después, con una tabla de escuelas editable. | USU-06, USU-14, PEN-08 |
| H-19 | Cola de validación | Orden y asignación entre administrador y Capítulo, para que dos personas no validen el mismo reporte. | PTS-02, ROL-05 |
| H-20 | Cambios al catálogo | Cambiar puntos o misiones sin alterar los puntos de reportes ya validados. | F-1205 |
| H-21 | Entornos y despliegue | Entornos de prueba y producción, respaldos y cómo se publica una versión. | PRD-09 |
| H-22 | Pruebas | Usar como casos de prueba los escenarios S-01 a S-12 de la parte 8. | — |
| H-23 | Costos | No hay presupuesto ni plazo. Estimar hosting y almacenamiento para 800 usuarios. | PRD-07, PRD-09 |
| H-24 | Identidad visual | El logo está pendiente. Los escudos de los diez rangos están en la hoja Rangos del Excel. | PEN-11 |

### B. Definiciones menores de negocio, con propuesta por defecto

El cliente no las fijó. El equipo puede empezar con la propuesta; si el cliente decide otra cosa, se cambia.

| ID | Definición | Propuesta por defecto |
|---|---|---|
| B-01 | Qué es "un mes" en los topes mensuales. | Mes calendario, en la zona horaria del miembro. |
| B-02 | Qué es "una semana" en el bono de constancia (cuatro semanas seguidas con una misión validada). | Semana de lunes a domingo. |
| B-03 | Qué son "tres meses consecutivos de actividad" de HIT-CAB. | Tres meses calendario seguidos, con al menos una misión reportada en cada uno. |
| B-04 | Si el ascenso es automático. | Sí: al cumplirse puntos, hito validado y Hospitalidad, el sistema asciende. El administrador valida el hito, no el ascenso. |
| B-05 | Si el mapa de apologetas lo ve el público. | Solo los miembros. Las fichas de sectas sí son públicas. |
| B-06 | Un máximo de puntos para las misiones que crean los rangos 5 o superiores. Hoy quien crea la misión fija sus puntos sin límite. | Un máximo que fija el administrador, para evitar misiones de puntaje desmedido. |
| B-07 | Si una misión creada por un miembro necesita aprobación del administrador antes de publicarse. | No, porque así se decidió. El administrador puede eliminarla después. |
| B-08 | Tope mensual por defecto de una misión nueva. | Sin tope hasta que el administrador o el sistema lo fijen. |

---

## Parte 7. Glosario

Definiciones de los términos tal como se usan en este proyecto. Fuentes: el Excel de rangos y misiones y las decisiones del 2026-10-28.

| Término | Definición |
|---|---|
| CAI | Cruzada Apologética Itinerante. Plataforma misionera católica para hombres hispanohablantes. |
| La Orden | Nombre que el Excel da a la comunidad de miembros, con estética templaria. |
| Apologética | Defensa razonada de la fe católica. |
| Miembro o soldado | Hombre mayor de 18 años que terminó el curso de apologética del Padre Luis Toro y fue aprobado por el administrador. |
| Rango | Uno de los diez niveles de la Orden, de Postulante (1) a Gran Maestre (10). |
| Misión | Acción reportable que otorga puntos (estudio, oración, conversación, debate, caridad, etc.). El catálogo tiene 47 en la v1. |
| Reporte | Envío de una misión realizada, con su evidencia, para que sea validada. |
| Evidencia | Prueba que se sube con el reporte: foto, video, bitácora, documento, enlace o registro en la app. |
| Bitácora | Relato escrito de una misión: quién, qué se planteó, qué se respondió y el resultado. |
| Crónica | Relato escrito opcional de una misión, siempre acompañado de fotos. |
| Hito | Misión llave de cada rango: sin ella no se asciende, por muchos puntos que se tengan. |
| Las dos llaves | Para ascender hacen falta los puntos del umbral y el hito del rango. El rango 4 no tiene hito. |
| Umbral | Puntos acumulados necesarios para alcanzar un rango. |
| Tope mensual | Máximo de puntos que una misión puede aportar en un mes. |
| Bono de ascenso | Puntos que se otorgan al llegar a un rango. |
| Validador | Quien marca un reporte como exitoso y correcto: el administrador o el Capítulo. |
| Administrador | Persona con credenciales de administración. Gestiona, valida y resuelve apelaciones. |
| Capítulo | Título que asigna el administrador a una o más personas, con los mismos permisos de validación. Es también el órgano de elección del Gran Maestre. |
| Gran Maestre | Rango 10. Vitalicio. Puede haber varios, uno por región. Lo registra el administrador tras una elección fuera de la app. |
| Voto de Fidelidad | Compromiso que profesa el Gran Maestre. No es una misión, no da puntos y no aparece en ninguna barra de progreso. |
| Escuadra | Grupo de dos a tres miembros que manda un Sargento de Armas (rango 4). |
| Pelotón | Grupo de hasta ocho miembros que manda un Caballero del Temple (rango 5). |
| Encomienda local | Unidad de una ciudad o zona que manda un Comendador (rango 6). |
| Comando | Término del cliente para un grupo consolidado por cantidad de miembros, con reuniones. Su definición está pendiente. |
| Grupo | Conjunto de miembros con un líder que organiza una misión. |
| Padrino | Figura que no existe en el proyecto (eliminada el 2026-11-07). |
| Ficha de secta | Registro en el mapa de un grupo religioso: nombre, dirección, coordenadas, foto y rama. |
| Rama | Familia a la que pertenece un grupo (pentecostal, metodista, anglicana, etc.). Texto libre. |
| Estado del miembro | En espera, activo, inactivo o expulsado. |
| Inactivo | Miembro sin misión reportada por 120 días. Conserva rango y puntos. |
| Postulante | Rango 1. Recién ingresado; no sale a campo. |
| Título del curso | Certificado del curso de apologética del Padre Luis Toro. Es la credencial de ingreso. |
| Interlocutor | Persona con quien se conversa o debate en una misión. No es miembro. |
| Baucent | Estandarte de la Orden, mitad negro y mitad blanco, con una cruz roja. |

---

## Parte 8. Escenarios de prueba

Se pueden usar luego como casos de prueba del producto.

| ID | Dado | Cuando | Entonces |
|---|---|---|---|
| S-01 | Una persona que no terminó el curso. | Intenta registrarse. | No puede entrar. |
| S-02 | Una persona con título aprobado por el administrador. | Se aprueba su ingreso. | Pasa de "en espera" a "activo" como Postulante, sin entrevista ni 30 días. |
| S-03 | Un título rechazado. | La persona vuelve a presentar el requisito sin fallos. | Se puede volver a evaluar. |
| S-04 | Un miembro con 100 puntos. | Se le quitan 10 por un reporte falso. | Queda con 90, nunca en cero. |
| S-05 | Un miembro que alcanzó su tope mensual. | Ayuda en la misión de otro. | Se le suman los puntos igualmente. |
| S-06 | Un reporte con evidencia falsa por segunda vez. | El administrador lo rechaza con motivo. | Pierde los puntos de ese reporte, baja un rango y pierde el hito del rango perdido. |
| S-07 | Un miembro sancionado. | Presiona el botón de apelación. | El administrador decide viendo la evidencia. |
| S-08 | Un Sargento de Armas (rango 4) sin misión de Hospitalidad en 90 días. | Cumple puntos e hito del rango 5. | No asciende hasta tener una misión de Hospitalidad validada. |
| S-09 | Un Escudero (rango 3) con los puntos del rango 4 (el rango 4 no tiene hito). | Intenta ascender sin misión de Hospitalidad. | No asciende (R-10 aplica para llegar al rango 4). |
| S-10 | Un miembro sin misión reportada por 60 días. | Pasan 60 días. | La app avisa al administrador; a los 120 días pasa a inactivo, conservando rango y puntos. |
| S-11 | Un miembro que sube una evidencia a las 22:00. | Envía el reporte. | La app muestra una advertencia de que a esa hora no se puede hacer la misión, y no bloquea el envío. |
| S-12 | Una misión con dos bonos que coinciden (por ejemplo constancia y calidad). | Se valida. | Se aplica solo el de mayor valor. |

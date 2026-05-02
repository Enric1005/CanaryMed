# CanaryMed

## Autores
Enrique Sosa Ojeda

Sergio Bañol Castaño

Erick Justo Sosa

## Descripción del proyecto
El propósito de CanaryMed es facilitar la vida de la gente que resida o se encuentre en canarias y contribuir a mejorar su salud. Con ese objetivo, se crea este proyecto con el cual se podrán ver los diferentes centros médicos que estén disponibles en una lista, mostrando información importante entre las cuales estaría su ubicación, precios o especialidades.

La funcionalidad principal se basa en actuar como un comparador de centros médicos, permitiendo a los diferentes usuarios buscar los centros que mejor se adapten a sus necesidades.

En un comienzo, el software solo incluirá unicamente centros ubicados en Gran canaria, con el objetivo de expandirlo en un futuro con más centros de dentro de la isla como del resto del archipiélago.

Desde un punto de vista comercial, el proyecto encontraría su rentabilidad mediante el cobro de comisiones a los centros médicos o través de una cuota por el uso de la web.

## Requisitos funcionales

El sistema deberá cumplir las siguientes requisitos:

1. Permitir al usuario visualizar un listado de los diferentes centros médicos y las especialidades que ofrece cada uno.

2. Permitir a los usuarios registrarse (alta) y darse de baja en la plataforma.

3. Permitir a los centros médicos registrarse en la plataforma.

4. Permitir a los centros médicos añadir, modificar o eliminar especialidades asociadas a su perfil.

5. Notificar por correo electrónico la validación del alta o baja de usuarios y centros médicos.

6. Permitir filtrar centros médicos por especialidad.

7. Permitir ordenar los centros médicos según criterios como valoración o rango de precios.

8. Permitir consultar la información detallada de una especialidad.

9. Mostrar la ubicación de los diferentes centros médicos mediante un mapa interactivo.

10. Permitir a los usuarios marcar centros médicos o especialidades como favoritos.

11. Permitir comparar centros médicos en función de precio, valoración y especialidades disponibles.
## Documentación

En el interior del proyecto se encuentra una carpeta llamada Documents, donde se encuentran los siguientes archivos:

- `lista_HTML_MOCKUPS.pdf` → Listado de la relación entre los HMTL y lo mockups.
- `Listado_De_Paginas_HTML.pdf` → Listado de páginas HTML, aspectos responsive, carga de templates y JSON, formularios, validaciones y especificación de la página de inicio.
- `Listado_templates.pdf` → Listado de los diferentes templates y donde se usan.
- `MockupsWeb_storyboard.pdf` → Mockups de la versión web y storyboard.
- `MockupsTabletMovil.pdf` → Mockups de la versión tablet y móvil.

---

## Usuario y contraseña de prueba


- **Usuario_cliente:** enriquesosa2005@gmail.com
- **Contraseña_cliente:** 123456
- **Usuario_empresa:** sergio@gmail.com
- **Contraseña_empresa:** Sergio_10

---

## Ubicación del contenido JSON

El contenido JSON se encuentra de forma **local** en el proyecto, dentro de la carpeta `JSON`, dividido en 3 archivos:

- `data-es.json` → Contenido de la aplicación en español.
- `data-en.json` → Contenido de la aplicación en inglés.
- `test_profile_data.json` → Datos de usuario para la autenticación de prueba.

#### Componentes
| Componente | Funcionalidad |

### **HOME**

- Header → Perfil, Buscador, Tabs (Home, Centros, Especialidades, Colabora con Nosotros)
- Main → Mapa con centros cercanos, 4 centros destacados con nombre y breve descripción
- Footer: Info básica, contacto, redes

---

### **Inicio de sesión**

- Celdas → Email/Usuario, Contraseña
- Botones → Iniciar sesión, Registrarse
- Links: Olvidé contraseña

---

### **Registro / Editar**

- Nombre, Apellidos, Email, Verificar email, Contraseña, Verificar contraseña, DNI, Teléfono
- Casilla Términos y privacidad
- Botón: Crear cuenta / Guardar

---

### **Perfil**

- Datos: Foto, Nombre de usuario, Nombre, Apellidos, Teléfono, DNI
- Opción: Editar perfil, Cerrar sesión
- Secciones: citas pendientes, centros, historial de citas

---

### **Centros**

- Lista de centros: Imagen, Nombre, Descripción

---

### **Especialidades**

- Lista de especialidades: Imagen, Nombre, Especificación, Botón Ver centros

---

### **Centro (detalle)**

- Nombre, Foto, Precio, Doctor
- Servicios, Especialidades disponibles
- Botón: Reservar cita

---

### **Especialidad (detalle)**

- Nombre, Foto, Precio, Doctor
- Centros disponibles con botón Pedir Cita

---

### **Citas pendientes**

- Lista de citas: Centro, Especialidad y Fecha

---

### **Historial de citas**

- Lista de citas: Centro, Especialidad y Fecha

---

### **Centros favoritos**

- Lista de citas: Centro, Especialidad y Fecha

---

### **Colabora con Nosotros**

- Formulario rápido: Centro, Email, Teléfono, Dirección, Especialidades y Tipo de especialidad
- Descripción corta: Cómo puedes unirte al proyecto
- Botón: Enviar solicitud

---

## **Acerca de Nosotros**

- Breve descripción de la empresa
- Misión y valores
- Equipo
- Redes sociales y contacto

---

## **Pedir Cita**

- Formulario: Centro, Especialidad, DNI, Fecha, Hora y Médico
- Botón: Confirmar cita
  
---

#### Servicios
| Servicio | Funcionalidad |
|---|---|
| `auth.ts` | Registro, login y cierre de sesión con Firebase Auth |
| `centros.ts` | Lectura y gestión de centros médicos desde Firestore |
| `especialidades.ts` | Lectura y gestión de especialidades desde Firestore |
| `cita.ts` | Gestión de citas: creación, consulta y cancelación |
| `crudService.ts` | Operaciones CRUD genéricas reutilizables contra Firebase |
| `dataService.ts` | Servicio central de acceso y distribución de datos |
| `data.ts` | Modelos y estructuras de datos de la aplicación |
| `loading.ts` | Control del estado de carga (spinner/loading global) |

---

### Estructura de datos en Firebase

#### `centers`
Centros médicos disponibles en la plataforma.
- `description`, `image`, `name`, `precio`, `sitio`
- `specialities[]`: especialidades del centro, cada una con:
  - `desc`, `name`, `price`, `src`, `location`
  - `doctor`: objeto con `name`, `hours` y `schedule` (fechas disponibles)

#### `users`
Usuarios registrados en la plataforma.
- `DNI`, `email`, `name`, `surname`, `phoneNumber`, `role`, `uid`
- `favs`: centros marcados como favoritos
- `hist`: historial de citas realizadas
- `pendientes`: citas pendientes

#### `colaboraciones`
Solicitudes de colaboración de centros médicos.
- `empresa`, `correo`, `telefono`, `direccion`
- `especialidad`, `tipoEspecialidad`, `institucion`
- `uid`, `creadoEn`

#### `quejas`
Incidencias y quejas de usuarios.
- `texto`, `fecha`

#### `specialities`
Especialidades globales del sistema.
- `desc`, `description`, `name`, `src`
- `centers[]`: centros que ofrecen esa especialidad con `doctor`, `image`, `location`, `name`, `price`

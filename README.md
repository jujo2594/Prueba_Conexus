# Prueba_Conexus
MVC de un programa de facturacion

# Tabla de Contenidos:

1. [Pruebas de Conocimiento](#pruebas-de-conocimiento)
2. [Script Base de Datos](#script-base-de-datos)
3. [Descripción del Proyecto](#descripción-del-proyecto)
4. [Requisitos Previos](#requisitos-previos)
5. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
6. [Configuración del Backend](#configuración-del-backend)
7. [Configuración del Frontend](#configuración-del-frontend)
8. [Endpoints de la API](#endpoints-de-la-api)
9. [Tecnologías Utilizadas](#tecnologías-utilizadas)

## PRUEBAS DE CONOCIMIENTO:

1. ¿Cuál es el objetivo o funcionalidad del leguaje XML?

XML (eXtensible Markup Language) es un lenguaje de marcado cuyo objetivo es almacenar y transportar datos. Permite definir etiquetas personalizadas para describir la información, lo que lo hace independiente de cualquier plataforma o lenguaje de programación. Es ampliamente utilizado en configuraciones de aplicaciones, intercambio de datos entre sistemas e integración de servicios.

2. ¿Cuál es la diferencia entre un servicio Api/REST y uno WCF?

| | API/REST | WCF |
|---|---|---|
| **Protocolo** | HTTP | HTTP, TCP, MSMQ |
| **Formato de datos** | JSON, XML | XML (SOAP) |
| **Compatibilidad** | Cualquier cliente con HTTP | Principalmente ecosistemas .NET |
| **Complejidad** | Simple y ligero | Robusto y complejo |
| **Uso recomendado** | Aplicaciones web y móviles | Sistemas empresariales internos |


En resumen, API/REST es más liviano, flexible y moderno, ideal para aplicaciones web. WCF (Windows Communication Foundation) es más robusto y adecuado para entornos empresariales que requieren múltiples protocolos de comunicación y mayor seguridad transaccional.

3. ¿Para qué casos sería recomendable usar una vista y no una tabla de la base de datos?

Usario una en los siguientes casos:

- Para simplificar consultas complejas que involucran multiples tablas con Join.
- Restringir el acceso a la base de datos a informacion o datos sensibles dentro de la base de datos. Mostrando solo la informacion necesaria
- Presentar datos calculados o combinados sin necesidad de almacenarlos fisicamente
- Cuando se busca estandarizar consultas que son usadas frecuentemente en diferentes partes del aplicativo o sistema.

4. ¿Cuál es el Objetivo o funcionalidad de una petición Json?

JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos cuyo objetivo es transmitir información estructurada entre un cliente y un servidor de forma simple y eficiente. Las peticiones JSON permiten enviar y recibir datos en un formato compatible, independiente del lenguaje de programación. Su sintaxis es fácil de leer y procesar, lo que lo convierte en el estándar más utilizado para la comunicación entre aplicaciones web modernas.

## SCRIPT BASE DE DATOS:

Los sripts completos para la creacion de la base de datos de este proyecto se encuentran dentro de la carpeta **database**, ahi encontrara los siguiente archivos:

- Conexus_Db_Script.sql: Este archivo cuenta con el script para definir, usar la base Conexus_Db, asi como todas las sentencias para definir tablas, indices y checks


## DESCRIPCIóN DEL PROYECTO:

El proyecto es un sistema de facturacion que permite gestionar clientes, productos, facturas y tiene un dashboard para realizar un analisis sencillo de los productos
mas vendidos y su total.

Adicionalmente se implemento un CRUD completo para Clientes, Productos y Emisores. El proyecto fue elaborado en un backend 3 capas, MVC + API/REST.

```
┌─────────────────┐        HTTP/REST        ┌──────────────────────┐
│   React + Vite  │ ──────────────────────► │  ASP.NET Core 8 API  │
│  localhost:5173 │ ◄────────────────────── │   localhost:7119     │
└─────────────────┘        JSON             └──────────┬───────────┘
                                                       │
                                                  Entity Framework Core
                                                       │
                                                       ▼
                                            ┌──────────────────────┐
                                            │   SQL Server 2022    │
                                            │     Conexus_Db       │
                                            └──────────────────────┘

```
## REQUISITOS PREVIOS:

| Herramienta | Versión mínima |
|---|---|
| SQL Server | 2019 o superior | 
| SQL Server Management Studio (SSMS) | Cualquier versión reciente | 
| .NET SDK | 8.0 |
| Visual Studio | 2022 | 
| Node.js | 18 o superior |

**Verificar instalaciones desde la terminal:**
```bash
dotnet --version    # debe mostrar 8.x.x
node --version      # debe mostrar v18.x.x o superior
npm --version       # debe mostrar 9.x.x o superior
```

## CONFIGURACIÓN DE LA BASE DE DATOS:

1. Abra **SQL Server Management Studio**
2. Conéctese a su instancia de SQL Server
3. Abra el archivo `DB_CONEXUS/Creacion_Tablas.sql`
4. Ejecute el script con `F5`

**Nota:** No es necesario insertar datos manualmente. El backend incluye datos semilla que se cargan automáticamente la primera vez que se ejecuta: 1 emisor, 2 clientes, 3 productos y 2 facturas de ejemplo.

## CONFIGURACIÓN DEL BACKEND

### Paso 1 — Abrir la solución

1. Abra **Visual Studio 2022**
2. Seleccione **Archivo → Abrir → Proyecto o solución**
3. Navegue a `backend/Conexus/` y abra `Conexus.sln`

### Paso 2 — Configurar la cadena de conexión

Abra `Conexus.Api/appsettings.json` y reemplace el valor de `Server` con el nombre de su instancia:

```json
{
  "ConnectionStrings": {
    "ConexusDB": "Server=NOMBRE_DE_SU_SERVIDOR\\SQLEXPRESS;Database=Conexus_Db;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}

### Paso 3 — Ejecutar el backend

**Desde Visual Studio:**
1. Verifique que el proyecto de inicio sea `Conexus.Api`
2. Seleccione el perfil `https` en el desplegable junto al botón ejecutar
3. Presione `F5`

**Desde la terminal:**
```bash
cd backend/Conexus/Conexus.Api
dotnet run
```

### Verificación

El backend estará disponible en `https://localhost:7119`. Al iniciar se abrirá automáticamente **Swagger UI** en:

```
https://localhost:7119/swagger
```

Swagger permite probar todos los endpoints de la API directamente desde el navegador.

## CONFIGURACIÓN DEL FRONTEND:

### Paso 1 — Instalar dependencias

```bash
cd frontend/conexus-app
npm install
```

### Paso 2 — Verificar la URL de la API

Abra `src/services/api.js` y confirme que apunte al puerto correcto:

```javascript
const api = axios.create({
    baseURL: 'https://localhost:7119/api',
});
```

### Paso 3 — Ejecutar el frontend

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## ENDPOINTS DE LA API

Base URL: `https://localhost:7119/api`

### Facturas
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/facturas` | Listar todas las facturas |
| GET | `/facturas/{id}` | Obtener factura por ID |
| GET | `/facturas/cliente/{identificacion}` | Facturas por cliente |
| GET | `/facturas/emisor/{identificacion}` | Facturas por emisor |
| GET | `/facturas/dashboard` | Datos para el dashboard |
| POST | `/facturas` | Crear nueva factura |
| PUT | `/facturas/{id}` | Actualizar factura |
| DELETE | `/facturas/{id}` | Eliminar factura |
| POST | `/facturas/detalle` | Agregar detalle |
| DELETE | `/facturas/detalle/{id}` | Eliminar detalle |

### Clientes
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/clientes` | Listar todos los clientes |
| GET | `/clientes/{id}` | Obtener cliente por ID |
| GET | `/clientes/identificacion/{identificacion}` | Buscar por identificación |
| POST | `/clientes` | Crear nuevo cliente |
| PUT | `/clientes/{id}` | Actualizar cliente |
| DELETE | `/clientes/{id}` | Eliminar cliente |

### Emisores
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/emisores` | Listar todos los emisores |
| GET | `/emisores/{id}` | Obtener emisor por ID |
| GET | `/emisores/identificacion/{identificacion}` | Buscar por identificación |
| POST | `/emisores` | Crear nuevo emisor |
| PUT | `/emisores/{id}` | Actualizar emisor |
| DELETE | `/emisores/{id}` | Eliminar emisor |

### Productos
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/productos` | Listar todos los productos |
| GET | `/productos/{id}` | Obtener producto por ID |
| GET | `/productos/codigo/{codigo}` | Buscar por código |
| GET | `/productos/nombre/{nombre}` | Buscar por nombre |
| POST | `/productos` | Crear nuevo producto |
| PUT | `/productos/{id}` | Actualizar producto |
| DELETE | `/productos/{id}` | Eliminar producto |

## TECNOLOGÍAS UTILIZADAS

### Base de Datos
- **SQL Server 2022** — motor de base de datos relacional
- Índices en campos de búsqueda frecuente para optimización de consultas
- `DECIMAL(18,2)` para valores monetarios

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| ASP.NET Core | 8.0 | Framework web y API REST |
| Entity Framework Core | 8.0.5 | ORM para acceso a datos |
| AutoMapper | 16.1.1 | Mapeo entre entidades y DTOs |
| Swagger / Swashbuckle | 6.6.2 | Documentación interactiva de la API |

**Patrones aplicados:**
- Repository Pattern con repositorio genérico `IRepository<T>`
- Service Layer para separación de lógica de negocio
- DTOs para desacoplar la capa de datos de la API
- Dependency Injection nativo de ASP.NET Core

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Librería de interfaz de usuario |
| Vite | 8.0 | Bundler y servidor de desarrollo |
| React Router DOM | 7 | Enrutamiento entre páginas |
| Axios | 1.x | Cliente HTTP para consumir la API |
| Recharts | 3.x | Gráfica de torta en el Dashboard |

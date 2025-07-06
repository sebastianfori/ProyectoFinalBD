#  Sistema de Votación Electrónica – ProyectBD2

Este es un proyecto de **Base de Datos II** que implementa un sistema de votación electrónica con:

* **Vista de votantes**: emisión de votos de forma segura.
* **Vista de presidente de mesa**: apertura y cierre de mesa, gestión de votos observados y visualización de resultados.
* **Vista de resultados**: muestra el escrutinio final.

##  Tecnologías usadas

| Tecnología              | Versión | Descripción              |
| ----------------------- | ------- | ------------------------ |
| Node.js                 | 16+     | Backend en JavaScript    |
| Express                 | 4+      | Framework backend        |
| MySQL                   | 8.0     | Base de datos relacional |
| Angular                 | 16+     | Frontend SPA             |
| Docker & docker-compose | latest  | Despliegue de servicios  |
| SCSS                    | latest  | Estilos modernos         |

##  Requerimientos previos

* **Node.js** v16+ [Descargar Node.js](https://nodejs.org/)
* **npm** (instalado con Node.js)
* **Docker** y **docker-compose** (opcional si usás contenedores)
* **MySQL** instalado localmente o ejecutado con Docker

##  Instalación y configuración

###  1. Clonar el repositorio

git clone <https://github.com/sebastianfori/ProyectoBDConMarcos.git>
cd <https://github.com/sebastianfori/ProyectoBDConMarcos.git>

###  2. Backend

1. Ingresar a la carpeta del backend:
   cd backend

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno:

Crear un archivo .env basado en .env.example con tus credenciales de MySQL:

DB\_HOST=localhost
DB\_USER=root
DB\_PASSWORD=tu\_password
DB\_NAME=nombre\_db
PORT=3000

4. Iniciar el servidor backend:
   npm start

Accederás al backend en [http://localhost:3000](http://localhost:3000)

###  3. Frontend (Angular)

1. Ingresar a la carpeta del frontend:
   cd frontend

2. Instalar dependencias:
   npm install

3. Iniciar la aplicación:
   ng serve

Disponible en [http://localhost:4200](http://localhost:4200)

##  Descripción funcional

###  Pantallas implementadas

* /login: permite autenticación de votante o presidente de mesa.
* /inicio: (si el usuario es presidente) muestra dos opciones: votar o acciones de presidente.
* /votante: permite al votante seleccionar papeleta y confirmar voto.
* /presidentemesa: apertura/cierre de mesa, ver votos observados.
* /votosobservados: lista de votantes observados pendientes, aprobación de votos.
* /resultados: muestra el escrutinio final con los votos por lista.

###  Roles

* **Votante**: emite su voto.
* **Presidente de mesa**: abre y cierra mesa, aprueba votos observados, visualiza resultados.

##  Estructura del proyecto

/backend
└── server.js
└── routes/
└── controllers/
└── models/
└── .env

/frontend
└── src/
└── angular.json
└── package.json

docker-compose.yml
README.md
.gitignore

##  Endpoints principales (backend)

| Método | Ruta                      | Descripción                         |
| ------ | ------------------------- | ----------------------------------- |
| POST   | /login                    | Login de usuario                    |
| POST   | /votos                    | Registrar voto normal               |
| POST   | /votos/observado          | Registrar voto observado            |
| GET    | /votos/observados         | Obtener votos observados pendientes |
| POST   | /votos/observados/aprobar | Aprobar voto observado              |
| GET    | /resultados               | Obtener resultados de escrutinio    |


##  Autores

* **Sebastián Forische, Agustin Scheldger y Luana Acuña** – Base de Datos II


Gracias por usar este sistema de votación!


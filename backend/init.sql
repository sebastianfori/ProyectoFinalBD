-- Crear tabla Departamento
CREATE TABLE IF NOT EXISTS Departamento (
  Nombre VARCHAR(100) PRIMARY KEY
);

-- Crear tabla Direccion
CREATE TABLE IF NOT EXISTS Direccion (
    Direccion VARCHAR(100) PRIMARY KEY,
    Codigo_Postal VARCHAR(10),
    Nombre_Departamento VARCHAR(100),
    FOREIGN KEY (Nombre_Departamento) REFERENCES Departamento(Nombre)
);

-- Crear tabla Establecimiento
CREATE TABLE IF NOT EXISTS Establecimiento (
    ID_Establecimiento INT PRIMARY KEY AUTO_INCREMENT,
    Direccion VARCHAR(100),
    FOREIGN KEY (Direccion) REFERENCES Direccion(Direccion)
);

-- Crear tabla Circuito
CREATE TABLE IF NOT EXISTS Circuito (
  Numero_Circuito INT PRIMARY KEY,
  EsAccesible BOOLEAN,
  EstaAbierto BOOLEAN,
  Circuito_Serie VARCHAR(50),
  Numero_Inicio INT,
  Numero_Fin INT,
  ID_Establecimiento INT,
  FOREIGN KEY (ID_Establecimiento) REFERENCES Establecimiento(ID_Establecimiento)
);

-- Crear tabla Votante
CREATE TABLE IF NOT EXISTS Votante (
    Cedula VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Fecha_Nacimiento DATE,
    Numero INT,
    Serie VARCHAR(50),
    Ya_Voto BOOLEAN,
    HabilitadoVotarPresidenteMesa BOOLEAN,
    Numero_Circuito INT,
    password VARCHAR(255),
    FOREIGN KEY (Direccion) REFERENCES Direccion(Direccion),
    FOREIGN KEY (Numero_Circuito) REFERENCES Circuito(Numero_Circuito)
);

-- Crear tabla AgentePolicial
CREATE TABLE IF NOT EXISTS AgentePolicial (
  CedulaVotante VARCHAR(20),
  Nro_Comisaria INT,
  ID_Establecimiento INT,
  PRIMARY KEY (CedulaVotante, Nro_Comisaria),
  FOREIGN KEY (CedulaVotante) REFERENCES Votante(Cedula),
  FOREIGN KEY (ID_Establecimiento) REFERENCES Establecimiento(ID_Establecimiento)
);

-- Crear tabla MiembroMesa
CREATE TABLE IF NOT EXISTS MiembroMesa (
  CedulaVotante VARCHAR(20),
  Tipo_Miembro VARCHAR(50),
  Numero_Circuito INT,
  PRIMARY KEY (CedulaVotante, Numero_Circuito),
  FOREIGN KEY (CedulaVotante) REFERENCES Votante(Cedula),
  FOREIGN KEY (Numero_Circuito) REFERENCES Circuito(Numero_Circuito)
);

CREATE TABLE IF NOT EXIST Observado (
  CedulaVotante VARCHAR(20),
  PRIMARY KEY (CedulaVotante),
  FOREIGN KEY (CedulaVotante) REFERENCES Votante(Cedula)
);
-- Crear tabla Comisaria
CREATE TABLE IF NOT EXISTS Comisaria (
    Nro_Comisaria INT PRIMARY KEY,
    Direccion VARCHAR(100),
    FOREIGN KEY (Direccion) REFERENCES Direccion(Direccion)
);

-- Crear tabla PartidoPolitico
CREATE TABLE IF NOT EXISTS PartidoPolitico (
  ID_Partido INT PRIMARY KEY AUTO_INCREMENT,
  NombrePartido VARCHAR(100),
  ID_Presidente int,
  ID_Vicepresidente int,
  FOREIGN KEY (ID_Presidente) REFERENCES Candidato(ID_Candidato),
  FOREIGN KEY (ID_Vicepresidente) REFERENCES Candidato(ID_Candidato)
);

-- Crear tabla Lista
CREATE TABLE IF NOT EXISTS Lista (
  ID_Lista INT PRIMARY KEY AUTO_INCREMENT,
  Numero_Lista INT,
  ID_Partido INT,
  FOREIGN KEY (ID_Partido) REFERENCES PartidoPolitico(ID_Partido)
);

-- Crear tabla Candidato
CREATE TABLE IF NOT EXISTS Candidato (
  ID_Candidato INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50),
  Apellido VARCHAR(50)
);

-- Crear tabla Integra
CREATE TABLE IF NOT EXISTS Integra (
  ID_Candidato INT,
  ID_Lista INT,
  PRIMARY KEY (ID_Candidato, ID_Lista),
  FOREIGN KEY (ID_Candidato) REFERENCES Candidato(ID_Candidato),
  FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
);

-- Crear tabla Voto
CREATE TABLE IF NOT EXISTS Voto (
  ID_Voto INT PRIMARY KEY AUTO_INCREMENT,
  Observado BOOLEAN,
  En_Blanco BOOLEAN,
  anulado BOOLEAN,
  Numero_Circuito INT,
  ID_Lista INT,
  FOREIGN KEY (Numero_Circuito) REFERENCES Circuito(Numero_Circuito)
  FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
);
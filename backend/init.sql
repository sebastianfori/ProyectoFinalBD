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
    Numero_Circuito INT,
    password VARCHAR(255),
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
 
-- Crear tabla Comisaria
CREATE TABLE IF NOT EXISTS Comisaria (
    Nro_Comisaria INT PRIMARY KEY,
    Direccion VARCHAR(100),
    FOREIGN KEY (Direccion) REFERENCES Direccion(Direccion)
);
-- Crear tabla Candidato
CREATE TABLE IF NOT EXISTS Candidato (
  ID_Candidato INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50),
  Apellido VARCHAR(50)
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
 
-- Crear tabla Integra
CREATE TABLE IF NOT EXISTS Integra (
  ID_Candidato INT,
  ID_Lista INT,
  PRIMARY KEY (ID_Candidato, ID_Lista),
  FOREIGN KEY (ID_Candidato) REFERENCES Candidato(ID_Candidato),
  FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
);
 
CREATE TABLE IF NOT EXISTS Voto (
  ID_Voto INT PRIMARY KEY AUTO_INCREMENT,
  Observado BOOLEAN,
  En_Blanco BOOLEAN,
  anulado BOOLEAN,
  Numero_Circuito INT,
  ID_Lista INT,
  FOREIGN KEY (Numero_Circuito) REFERENCES Circuito(Numero_Circuito),
  FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
);
 
CREATE TABLE IF NOT EXISTS Observados(
  Cedula VARCHAR(20) PRIMARY KEY,
  Numero_Circuito INT,
  FOREIGN KEY (Numero_Circuito) REFERENCES Circuito(Numero_Circuito)
);
 
-- 1. Departamento
INSERT INTO Departamento (Nombre) VALUES
('Montevideo'),
('Canelones');
 
-- 2. Direcciones
INSERT INTO Direccion (Direccion, Codigo_Postal, Nombre_Departamento) VALUES
('Av. Italia 1234', '11500', 'Montevideo'),
('Ruta 8 km 29', '90000', 'Canelones');
 
-- 3. Establecimientos
INSERT INTO Establecimiento (Direccion) VALUES
('Av. Italia 1234'),
('Ruta 8 km 29');
 
-- 4. Circuitos
INSERT INTO Circuito (Numero_Circuito, EsAccesible, EstaAbierto, Circuito_Serie, Numero_Inicio, Numero_Fin, ID_Establecimiento) VALUES
(101, TRUE, TRUE, 'A', 1, 100, 1),
(102, TRUE, FALSE, 'B', 101, 200, 2);
 
-- 5. Candidatos
INSERT INTO Candidato (Nombre, Apellido) VALUES
('Juan', 'Perez'),       
('Maria', 'Garcia'),     
('Luis', 'Rodriguez'),   
('Ana', 'Lopez'),        
('Pablo', 'Fernandez'),  
('Laura', 'Martinez'),   
('Carlos', 'Suarez'),    
('Sofia', 'Ruiz'),       
('Federico', 'Santos'),  
('Valeria', 'Morales');
 
-- 6. Partidos
INSERT INTO PartidoPolitico (NombrePartido, ID_Presidente, ID_Vicepresidente) VALUES
('Partido Azul', 1, 2),
('Partido Verde', 3, 4),
('Partido Amarillo', 5, 6),
('Partido Rojo', 7, 8),
('Partido Violeta', 9, 10);
 
-- 7. Listas
INSERT INTO Lista (Numero_Lista, ID_Partido) VALUES
(100, 1),
(200, 2),
(300, 3),
(400, 4),
(500, 5);
 
-- 8. Integra
INSERT INTO Integra (ID_Candidato, ID_Lista) VALUES
(1, 1), (2, 1),
(3, 2), (4, 2),
(5, 3), (6, 3),
(7, 4), (8, 4),
(9, 5), (10, 5);
 
-- 9. Votantes
INSERT INTO Votante (Cedula, Nombre, Apellido, Fecha_Nacimiento, Numero, Serie, Ya_Voto, Numero_Circuito, password)
VALUES
('11111111', 'Pedro', 'Ramirez', '1995-04-10', 45, 'A', FALSE, 101, '$2b$10$1d9D.mqL/IOHr6HtGrMxNuTgLRkX5pMtpZBlVVw.yVhvFSSuFgsZW'),
('22222222', 'Lucia', 'Torres', '2000-08-22', 150, 'B', FALSE, 102, '$2b$10$1d9D.mqL/IOHr6HtGrMxNuTgLRkX5pMtpZBlVVw.yVhvFSSuFgsZW');
 
-- 10. Miembros de mesa
INSERT INTO Votante (Cedula, Nombre, Apellido, Fecha_Nacimiento, Numero, Serie, Ya_Voto, Numero_Circuito, password)
VALUES
('33333333', 'Jorge', 'Martin', '1980-02-14', 25, 'A', FALSE, 101, '$2b$10$1d9D.mqL/IOHr6HtGrMxNuTgLRkX5pMtpZBlVVw.yVhvFSSuFgsZW'),
('44444444', 'Valeria', 'Munoz', '1985-11-09', 175, 'B', FALSE, 102, '$2b$10$1d9D.mqL/IOHr6HtGrMxNuTgLRkX5pMtpZBlVVw.yVhvFSSuFgsZW');
 
-- 11. Asociacion a mesa
INSERT INTO MiembroMesa (CedulaVotante, Tipo_Miembro, Numero_Circuito)
VALUES
('33333333', 'Presidente', 101),
('44444444', 'Presidente', 102);

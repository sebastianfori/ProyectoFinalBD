const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');
const bcrypt = require('bcrypt');


async function observarVotante(cedula, numeroCircuito) {
      const connection = await mysql.createConnection(dbConfig);
  try {

    // Buscar el votante por cédula
    const [votantes] = await connection.execute(
      'SELECT * FROM Votante WHERE Cedula = ?',
      [cedula]
    );
    if (votantes.length === 0) {
      return { error: 'Votante no encontrado' };
    }
    const votante = votantes[0];
    // Verificar si el votante ya ha votado
    if (votante.Ya_Voto) {
      return { error: 'El votante ya ha votado' };
    }
    // insertar el votante en la tabla Observado
    const [result] = await connection.execute(
      'INSERT INTO Observados (Cedula, Numero_Circuito) VALUES (?, ?)',
      [cedula, numeroCircuito]
    );

  } catch (error) {
    console.error('Error al observar al votante:', error);
    return { error: 'Error al observar al votante' };
  } finally {
    await connection.end();
  }
  return { message: 'Votante observado correctamente' };
}

async function findUser(cedula) {
  const connection = await mysql.createConnection(dbConfig);
  try {
  

  const [votantes] = await connection.execute(
    'SELECT (Cedula, Nombre, Apellido, Fecha_Nacimiento, Numero, Serie, Ya_Voto, Numero_Circuito) FROM Votante WHERE Cedula = ?',
    [cedula]
  );

  if (votantes.length === 0) {
    await connection.end();
    return { error: 'Votante no encontrado' };
  }

  const votante = votantes[0];

  const [miembros] = await connection.execute(
    'SELECT * FROM MiembroMesa WHERE CedulaVotante = ?',
    [cedula]
  );


  if (miembros && miembros.length > 0) {
    return { tipo: 'miembro_mesa', miembro: miembros[0], usuario: votante,  password: votante.Password };
  }

  return { tipo: 'votante', usuario: votante, password: votante.Password };
  } catch (error) {
    console.error('Error al buscar el votante:', error);
    return { error: 'Error al buscar el votante' };
  }
  finally {
      await connection.end();
  } 
}




module.exports = {
  findUser,
  observarVotante
};

  // // 3. Verificar si el circuito está abierto
  // const [circuitos] = await connection.execute(
  //   'SELECT abierto FROM circuitos WHERE id = ?',
  //   [votante.circuito_id]
  // );
  // await connection.end();

  // if (circuitos.length === 0 || !circuitos[0].abierto) {
  //   return { error: 'El circuito no está abierto' };
  // }
    // 1. Buscar si es miembro de mesa
    
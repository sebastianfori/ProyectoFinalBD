const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');
const bcrypt = require('bcrypt');


async function findUser(cedula) {
  const connection = await mysql.createConnection(dbConfig);

  const [votantes] = await connection.execute(
    'SELECT * FROM Votante WHERE Cedula = ?',
    [cedula]
  );

  if (votantes.length === 0) {
    await connection.end();
    return { error: 'Credenciales inválidas' };
  }

  const votante = votantes[0];

  const [miembros] = await connection.execute(
    'SELECT * FROM MiembroMesa WHERE CedulaVotante = ?',
    [cedula]
  );

  await connection.end();

  if (miembros && miembros.length > 0) {
    return { tipo: 'miembro_mesa', usuario: votante, password: votante.Password };
  }

  return { tipo: 'votante', usuario: votante, password: votante.Password };
}


async function habilitarVotante(cedula) {
  const connection = await mysql.createConnection(dbConfig);
  // 1. hacer el update del votante si existe
  const [result] = await connection.execute(
    'UPDATE Votante SET HabilitadoVotarPresidenteMesa = 1 WHERE Cedula = ?',
    [cedula]
  );
  if (result.affectedRows === 0) {
    await connection.end();
    return { error: 'Votante no encontrado o ya habilitado' };
  }
  await connection.end();
  return { message: 'Votante habilitado exitosamente' };
}




module.exports = {
  findUser
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
    
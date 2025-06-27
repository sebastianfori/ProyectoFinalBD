const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');
const bcrypt = require('bcryptjs');


async function findUser(cedula) {
  const connection = await mysql.createConnection(dbConfig);



  // 2. Buscar si es votante
  const [votantes] = await connection.execute(
    'SELECT * FROM votantes WHERE Cedula = ?',
    [cedula]
  );
  
  if (votantes.length === 0) {
    await connection.end();
    return { error: 'Credenciales inválidas' };
  }

  const votante = votantes[0];


  const [miembros] = await connection.execute(
    'SELECT * FROM MiembroMesa WHERE Cedula = ?',
    [cedula]
  );
  if (miembros.length > 0) {
    return {miembro : miembros[0] , tipo: 'miembro_mesa', usuario: votante};
  }
  await connection.end();

  return { tipo: 'votante', usuario: votante };





};  loginUsuariomodule.exports = {}

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
    
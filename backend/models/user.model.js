const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');
const bcrypt = require('bcryptjs');


async function loginUsuario(cedula, password) {
  const connection = await mysql.createConnection(dbConfig);

  // 1. Buscar si es miembro de mesa
  const [miembros] = await connection.execute(
    'SELECT * FROM MiembroMesa WHERE Cedula = ?',
    [cedula]
  );
  if (miembros.length > 0) {
    await connection.end();
    return { tipo: 'miembro_mesa', usuario: miembros[0] };
  }

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
  const isMatch = await bcrypt.compare(password, votante.password);
  if (!isMatch) {
    await connection.end();
    return { error: 'Credenciales inválidas' };
  }

  // 3. Verificar si el circuito está abierto
  const [circuitos] = await connection.execute(
    'SELECT abierto FROM circuitos WHERE id = ?',
    [votante.circuito_id]
  );
  await connection.end();

  if (circuitos.length === 0 || !circuitos[0].abierto) {
    return { error: 'El circuito no está abierto' };
  }

  return { tipo: 'votante', usuario: votante };





};  loginUsuariomodule.exports = {}

module.exports = {
  loginUsuario
};
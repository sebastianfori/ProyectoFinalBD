const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

async function actualizarEstadoCircuito(estado, numeroCircuito ) {
  const connection = await mysql.createConnection(dbConfig);
  try { 
    // Actualizar el estado del circuito
    const [result] = await connection.execute(
      'UPDATE Circuito SET EstaAbierto = ? WHERE Numero_Circuito = ?',
      [estado, numeroCircuito]
    );  
    if (result.affectedRows === 0) {
      return { error: 'No se encontró el circuito o no se pudo actualizar.' };
    }
    return { message: 'Estado del circuito actualizado correctamente.' };
  } catch (error) {
    console.error('Error al actualizar el estado del circuito:', error);
    return { error: 'Error al actualizar el estado del circuito.' };
  } finally {
    await connection.end();
  }
}

module.exports = {
  actualizarEstadoCircuito,
};
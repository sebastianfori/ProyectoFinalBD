const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

async function obtenerListas() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rawListas] = await connection.execute(`
      SELECT 
        l.ID_Lista, 
        l.Numero_Lista,
        c.ID_Candidato, 
        c.Nombre, 
        c.Apellido,
        p.ID_Partido, 
        p.NombrePartido,
        CASE 
          WHEN p.ID_Presidente = c.ID_Candidato THEN 'Presidente'
          ELSE 'Vicepresidente'
        END AS Rol
      FROM Lista l
      JOIN PartidoPolitico p ON l.ID_Partido = p.ID_Partido
      JOIN Candidato c ON c.ID_Candidato IN (p.ID_Presidente, p.ID_Vicepresidente)
    `);

    const listas = [];

    for (const item of rawListas) {
      let lista = listas.find(l => l.ID_Lista === item.ID_Lista);

      if (!lista) {
        lista = {
          ID_Lista: item.ID_Lista,
          Numero_Lista: item.Numero_Lista,
          Partido: item.NombrePartido,
          Presidente: null,
          Vicepresidente: null
        };
        listas.push(lista);
      }

      if (item.Rol === 'Presidente') {
        lista.Presidente = {
          ID_Candidato: item.ID_Candidato,
          Nombre: item.Nombre,
          Apellido: item.Apellido
        };
      } else if (item.Rol === 'Vicepresidente') {
        lista.Vicepresidente = {
          ID_Candidato: item.ID_Candidato,
          Nombre: item.Nombre,
          Apellido: item.Apellido
        };
      }
    }

    return listas;
  } catch (error) {
    console.error('Error al obtener las listas:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = {
  obtenerListas
};

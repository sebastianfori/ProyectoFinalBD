const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

async function obtenerListas() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        //cada lista tiene un presidente y vicepresidente que los dos son candidatos
        // Obtener todas las listas con sus candidatos y partidos
        const [listas] = await connection.execute(`
            SELECT l.ID_Lista, l.Numero_Lista,
                     c.ID_Candidato, c.Nombre, c.Apellido,
                     p.ID_Partido, p.NombrePartido 
            FROM Lista l
            JOIN Candidato c ON l.ID_Presidente = c.ID_Candidato
            JOIN PartidoPolitico p ON l.ID_Partido = p.ID_Partido
            UNION
            SELECT l.ID_Lista, l.Numero_Lista,
                        c.ID_Candidato, c.Nombre, c.Apellido,
                        p.ID_Partido, p.NombrePartido 
            FROM Lista l
            JOIN Candidato c ON l.ID_Vicepresidente = c.ID_Candidato
            JOIN PartidoPolitico p ON l.ID_Partido = p.ID_Partido
        `);
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
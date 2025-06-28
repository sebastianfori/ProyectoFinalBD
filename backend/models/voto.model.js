const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

async function obtenerVotosPorLista() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        // Obtener el número de votos por lista
        const [result] = await connection.execute(`
            SELECT l.ID_Lista, l.Numero_Lista, COUNT(v.ID_Voto) AS Numero_Votos
            FROM Lista l
            LEFT JOIN Voto v ON l.ID_Lista = v.ID_Lista
            GROUP BY l.ID_Lista, l.Numero_Lista
        `);
        return result;
    } catch (error) {
        console.error('Error al obtener los votos por lista:', error);
        throw error;
    }   finally {
        await connection.end();   
    }
}
async function obtenerVotosConCandidatos() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        // Obtener el número de votos por lista con los candidatos
        const [result] = await connection.execute(`
            SELECT l.ID_Lista, l.Numero_Lista, c.Nombre AS Nombre_Candidato, COUNT(v.ID_Voto) AS Numero_Votos
            FROM Lista l
            LEFT JOIN Voto v ON l.ID_Lista = v.ID_Lista
            LEFT JOIN Candidato c ON l.ID_Lista = c.ID_Lista
            GROUP BY l.ID_Lista, l.Numero_Lista, c.Nombre
        `);
        return result;
    } catch (error) {
        console.error('Error al obtener los votos con candidatos:', error);
        throw error;
    } finally {
        await connection.end();
    }   
}

async function registrarVoto(idLista, cedula, votoObservado = false, votoExepcional = 'blanco'|| 'anulado ') {

    const connection = await mysql.createConnection(dbConfig);
    try {
        // hacer todo esto transacional
        await connection.beginTransaction();
        
        // Verificar si el votante ya ha votado traer votante por cedula 
        const [votante] = await connection.execute(
            'SELECT * FROM Votante WHERE Cedula = ?',  
            [cedula]
        );    
        if (votante.length === 0) {
            throw new Error('Votante no encontrado');
        }   
        if (votante[0].Ya_Voto) {  
            throw new Error('El votante ya ha votado');
        } 
        if (!votante[0].HabilitadoVotarPresidenteMesa) {
            throw new Error('El votante no está habilitado para votar en esta mesa');
        }
        // Registrar el voto
        const [result] = await connection.execute(
            'UPDATE INTO Votante SET Ya_Voto = TRUE WHERE Cedula = ?',
            [cedula]
        );
        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el estado del votante');
        }   
        // Registrar el voto en la tabla Voto
        const [votoResult] = await connection.execute(
            'INSERT INTO Voto (Observado, En_Blanco, anulado, Numero_Circuito, ID_Lista) VALUES (?, ?, ?, ?, ?)',
            [votoObservado, votoExepcional === 'blanco', votoExepcional === 'anulado', votante[0].Numero_Circuito, idLista]   
        );
        if (votoResult.affectedRows === 0) {
            throw new Error('No se pudo registrar el voto');
        }     
        // Confirmar la transacción
        await connection.commit();
        return { message: 'Voto registrado exitosamente' };
    } catch (error) {
        console.error('Error al registrar el voto:', error);        
        // Revertir la transacción en caso de error
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}
module.exports = {
    obtenerVotosPorLista,
    registrarVoto
};
// CREATE TABLE IF NOT EXISTS Voto (
//   ID_Voto INT PRIMARY KEY AUTO_INCREMENT,
//   Observado BOOLEAN,
//   En_Blanco BOOLEAN,
//   anulado BOOLEAN,
//   Numero_Circuito INT,
//   ID_Lista INT,
//   FOREIGN KEY (Numero_Circuito) REFERENCES Circuito(Numero_Circuito)
//   FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
// );




// presidente chequea si el votante eesta habilitado para votar en la mesa /check votante puede votar 
// 1) escribir cedula del votante, enter
//2) renderisar informacion votante y checkbox habilitar para votar y checkbox voto observado y enviar 


//
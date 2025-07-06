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
async function obtenerResumenVotacion() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // ✅ Solo votos válidos y no observados
    const [resumenPorPartido] = await connection.execute(`
      SELECT 
        p.NombrePartido,
        COUNT(v.ID_Voto) AS Votos
      FROM Voto v
      JOIN Lista l ON v.ID_Lista = l.ID_Lista
      JOIN PartidoPolitico p ON l.ID_Partido = p.ID_Partido
      WHERE v.En_Blanco = FALSE AND v.anulado = FALSE AND v.Observado = FALSE
      GROUP BY p.NombrePartido
    `);

    // ✅ Total de votos válidos no observados
    const [totalVotos] = await connection.execute(`
      SELECT COUNT(*) AS total FROM Voto
      WHERE En_Blanco = FALSE AND anulado = FALSE AND Observado = FALSE
    `);

    // ✅ Votos en blanco no observados
    const [blancos] = await connection.execute(`
      SELECT COUNT(*) AS total FROM Voto
      WHERE En_Blanco = TRUE AND Observado = FALSE
    `);

    // ✅ Votos anulados no observados
    const [anulados] = await connection.execute(`
      SELECT COUNT(*) AS total FROM Voto
      WHERE anulado = TRUE AND Observado = FALSE
    `);

    // ✅ Votos observados (únicamente los observados, sin importar si eran válidos/blancos/anulados)
    const [observados] = await connection.execute(`
      SELECT COUNT(*) AS total FROM Voto
      WHERE Observado = TRUE
    `);

    const totalValidos = totalVotos[0].total || 1; // evitar división por 0

    const partidosConPorcentaje = resumenPorPartido.map(p => ({
      nombre: p.NombrePartido,
      votos: p.Votos,
      porcentaje: ((p.Votos / totalValidos) * 100).toFixed(2) + '%'
    }));

    return {
      partidos: partidosConPorcentaje,
      votos_blanco: blancos[0].total,
      votos_anulados: anulados[0].total,
      votos_observados: observados[0].total,
      total_votos_validos: totalValidos
    };
  } catch (error) {
    console.error('Error al obtener resumen de votación:', error);
    throw error;
  } finally {
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
//TODO remplazar votoExepcional por otra cosa 

async function registrarVoto(numeroLista, cedula, votoEnBlanco = false, votoAnulado= false) {

    const connection = await mysql.createConnection(dbConfig);
    try {
        let observed = false;
        // hacer todo esto transacional
        await connection.beginTransaction();
        if (votoEnBlanco && votoAnulado) {
            throw new Error('No se puede votar en blanco y anular el voto al mismo tiempo');
        }
        // Verificar si el votante ya ha votado traer votante por cedula 
        const [votante] = await connection.execute(
            'SELECT * FROM Votante WHERE Cedula = ?',  
            [cedula]
        );    
        if (votante.length === 0) {
           const noEncontradoError = new Error('Votante no encontrado');
           noEncontradoError.statusCode = 404;
           throw noEncontradoError;
        }   
        if (votante[0].Ya_Voto) {  
            const yaVotoError = new Error('El votante ya ha votado');
            yaVotoError.statusCode = 400;
            throw yaVotoError;
        }
         
        // Registrar el voto
        const [result] = await connection.execute(
            'UPDATE Votante SET Ya_Voto = TRUE WHERE Cedula = ?',
            [cedula]
        );
        const [EsObservado] = await connection.execute(
            'SELECT * FROM Observados Where Cedula = ?',
            [cedula]
        );
        let numeroCircuito = votante[0].Numero_Circuito;
        
        if (EsObservado.length > 0) {
            // Si el votante está en la tabla Observados, marcar el voto como observado
            observed = true;
            numeroCircuito = EsObservado[0].Numero_Circuito; // Usar el circuito del votante observado
            
        }
        let idLista;
        // verificar que la mesa esta abierta
        const [circuito] = await connection.execute(
            'SELECT EstaAbierto FROM Circuito WHERE Numero_Circuito = ?',
            [numeroCircuito]
        );

        if (circuito.length === 0) {
            const circuitoNoExisteError = new Error('El circuito no existe');
            circuitoNoExisteError.statusCode = 404;
            throw circuitoNoExisteError;
        }
        if (!circuito[0].EstaAbierto) {
            const circuitoCerradoError = new Error('El circuito está cerrado');
            circuitoCerradoError.statusCode = 400;
            throw circuitoCerradoError;
        }
        if (!votoEnBlanco  && !votoAnulado) {
            // Si el voto es en blanco o anulado, no se necesita verificar la lista
            const [rows] = await connection.execute(
            'SELECT ID_Lista FROM Lista WHERE Numero_Lista = ?',
            [numeroLista] // acá recibís el número como 100, 200, etc.
            );
            
            if (rows.length === 0) {
                const listaNoExisteError = new Error('El votante voto por una lista que no existe');
                listaNoExisteError.statusCode = 404;
                throw listaNoExisteError;
            }

            idLista = rows[0].ID_Lista;
        } else {
            // Si el voto es en blanco o anulado, no se necesita verificar la lista
            idLista = null; // o el ID de una lista especial para votos en blanco/anulados
        }
        //SI EL VOTANTE ES OBSERVADO EL CIRCUITO 
        // Registrar el voto en la tabla Voto
        const [votoResult] = await connection.execute(
            'INSERT INTO Voto (Observado, En_Blanco, anulado, Numero_Circuito, ID_Lista) VALUES (?, ?, ?, ?, ?)',
            [observed, votoEnBlanco, votoAnulado, numeroCircuito, idLista]   
        );
        // Confirmar la transacción
        await connection.commit();
        return { message: 'Voto registrado exitosamente' };
    } catch (error) {
        console.error('Error al registrar el voto modelo:', error);        
        // Revertir la transacción en caso de error
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
}
module.exports = {
    obtenerVotosPorLista,
    registrarVoto,
    obtenerResumenVotacion
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
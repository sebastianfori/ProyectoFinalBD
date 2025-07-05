
const db = require('../config/db.config');
const circuitoModel = require('../models/circuito.model');
userModel = require('../models/user.model');

async function actualizarEstadoMesa(req, res) {
    const { user } = req;
    const circuito = user.miembro.Numero_Circuito;
    const estado = req.body.estado; // 'true ' o 'false'

    // Validar que el estado sea 'true' o 'false'
    if (estado !== '1' && estado !== '0') {
        return res.status(400).send({ error: 'Estado inválido. Debe ser "true" o "false".' });
    }   
    // Validar que la hora actual sea válida para abrir o cerrar el circuito
    try {
        validarEstado(estado);
 
    await circuitoModel.actualizarEstadoCircuito(estado, circuito)
    res.status(200).send({ message: 'Mesa abierta/cerrada con éxito.' });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
function validarEstado(estado) {
    const horaActual = new Date();
    // no puede abrir antes de las 8 
    const horaApertura = new Date(horaActual.getFullYear(), horaActual.getMonth(), horaActual.getDate(), 8, 0, 0);
    if (estado === 'true' && horaActual < horaApertura) {
        throw new Error('No se puede abrir el circuito antes de las 8:00 AM');
    }
    // no puede cerrar despues de las 8
    const horaCierre = new Date(horaActual.getFullYear(), horaActual.getMonth(), horaActual.getDate(), 20, 0, 0);
    if (estado === 'false' && horaActual > horaCierre) {
        throw new Error('No se puede cerrar el circuito después de las 8:00 PM');
    }   
}
function view(req, res) {
  res.send("Vista del presidente");
}

function observarVoto(req, res) {
    const { user } = req;
    const cedula = req.body.cedula;
    console.log('USER EN OBSERVAR:', user);
  

    // Validar que la cédula sea un número válido
    if (!cedula || isNaN(cedula)) {
        return res.status(400).send({ error: 'Cédula inválida.' });
    }
    // Buscar al votante por cédula
    userModel.observarVotante(cedula, user.miembro.Numero_Circuito)
        .then(result => {
            if (result.error) {
                return res.status(400).send({ error: result.error });
            }
            res.status(200).send({ message: result.message });
        })
        .catch(error => {
            console.error('Error al observar el voto:', error);
            res.status(500).send({ error: 'Error al observar el voto.' });  
        });
        

}
async function buscarVotantePorCedula(req, res) {
    const { cedula } = req.params;
    try {
        const votante = await userModel.findUser(cedula);
        if (votante.error) {
            return res.status(404).send({ error: votante.error });
        }
        res.status(200).send(votante);
    } catch (error) {
        console.error('Error al buscar el votante por cédula:', error);
        res.status(500).send({ error: 'Error al buscar el votante por cédula.' });
    }
    
}
    

module.exports = {
    view,
    actualizarEstadoMesa,
    observarVoto,
    buscarVotantePorCedula
};
// async function buscarVotantePorCedula(cedula) {

// async function habilitarVotante(req, res) {
//     const { user } = req;
//     const cedula = req.body.cedula;
//     const circuito = user.miembro.Numero_Circuito;
//     // Validar que la cédula sea un número válido
//     if (!cedula || isNaN(cedula)) {
//         return res.status(400).send({ error: 'Cédula inválida.' });
//     }
//     // Validar que la hora actual sea válida para habilitar al votante
//     const horaActual = new Date();
//     const horaApertura = new Date(horaActual.getFullYear(), horaActual.getMonth(), horaActual.getDate(), 8, 0, 0);
//     if (horaActual < horaApertura) {
//         return res.status(400).send({ error: 'No se puede habilitar al votante antes de las 8:00 AM.' });
//     }

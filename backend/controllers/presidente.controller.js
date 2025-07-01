
// actualizar estado de mesa  lo que hace busca la mesa del presidente, veo si el circuito esta abierto o cerrado 
//y permitir abrirlo despues de la hora pautada y tambien permitit cerralo despues de la hora pautada
const db = require('../config/db.config');
const circuitoModel = require('../models/circuito.model');
userModel = require('../models/user.model');

async function actualizarEstadoMesa(req, res) {
    const { user } = req;
    const circuito = user.miembro.Numero_Circuito;
    const estado = req.body.estado; // 'true ' o 'false'

    // Validar que el estado sea 'true' o 'false'
    if (estado !== 'true' && estado !== 'false') {
        return res.status(400).send({ error: 'Estado inválido. Debe ser "true" o "false".' });
    }   
    // Validar que la hora actual sea válida para abrir o cerrar el circuito
    try {
        validarEstado(estado);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
    await circuitoModel.actualizarEstadoCircuito(estado, circuito)
 
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

function habilitarVotante(req, res) {
 res.send("Vista del presidente");
}

function observarVoto(req, res) {
  res.send("Vista del presidente");
}

module.exports = {
  view,
  actualizarEstadoMesa,
  habilitarVotante,
  observarVoto,
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
//     // Llamar al modelo para habilitar al votante
    
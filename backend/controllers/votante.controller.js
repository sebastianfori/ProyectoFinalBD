const Lista = require('../models/lista.model');
const Voto = require('../models/voto.model');

async function view(req, res, next) {
    try {
        const listas = await Lista.obtenerListas();
        res.status(200).json(listas);
    } catch (error) {
        console.error('Error al obtener las listas:', error);
        res.status(500).json({ error: 'Error al obtener las listas.' });
    }
}

async function votar(req, res, next) {

    try {
        const { cedula} = req.user;
        const { papeletaId, VotoExcepcional } = req.body;
        console.log('Datos recibidos para votar:', { papeletaId, cedula, VotoExcepcional });
        if (!papeletaId || !cedula || !VotoExcepcional) {
            return res.status(400).json({ error: 'Faltan datos para registrar el voto.' });
        }

        if (VotoExcepcional === 'blanco') {
           await Voto.registrarVoto(null , cedula, true, false);
        } else if (VotoExcepcional === 'anulado') {
            await Voto.registrarVoto(null , cedula, false, true);
        } else {
            await Voto.registrarVoto(papeletaId, cedula, false, false);
        }
        res.status(200).json({ message: 'Voto registrado exitosamente.' });
    } catch (error) {
        if (error.statusCode) {
            console.log('error.message', error.message);
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.error('Error al registrar el voto: controlador', error);
        res.status(500).json({ error: 'Error al registrar el voto.' });
    }
        // Aquí deberías implementar la lógica para registrar el voto del usuario
}
        

module.exports = {
    view,
    votar
};  
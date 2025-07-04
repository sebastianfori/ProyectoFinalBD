// votar 
//view listas con los candidatos 

const Lista = require('../models/lista.model');

async function view(req, res, next) {
    try {
        const listas = await Lista.obtenerListas();
        res.status(200).json(listas);
    } catch (error) {
        console.error('Error al obtener las listas:', error);
        res.status(500).json({ error: 'Error al obtener las listas.' });
    }
}
votar
async function votar(req, res, next) {
        console.log('Votando...');
}
        // Aquí deberías implementar la lógica para registrar el voto del usuario

        

module.exports = {
    view,
    votar
};  
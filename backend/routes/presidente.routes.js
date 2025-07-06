const express = require('express');
const router = express.Router();
const presidenteController = require('../controllers/presidente.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorizationMiddleware = require('../middlewares/authorization.middleware');
router.get('/view', authMiddleware, authorizationMiddleware.authorize('miembro_mesa'),  presidenteController.view);
router.post('/actualizar-estado-mesa',authMiddleware,authorizationMiddleware.authorize('miembro_mesa'), presidenteController.actualizarEstadoMesa);
router.post('/observar-voto', authMiddleware, authorizationMiddleware.authorize('miembro_mesa'), presidenteController.observarVoto);
router.get('/buscar-votante/:cedula', authMiddleware, authorizationMiddleware.authorize('miembro_mesa'), presidenteController.buscarVotantePorCedula);
router.get('/resumen-votos', authMiddleware, authorizationMiddleware.authorize('miembro_mesa'), presidenteController.obtenerResumenVotos);

// Rutas para el presidente
module.exports = router;
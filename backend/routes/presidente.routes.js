const express = require('express');
const router = express.Router();
const presidenteController = require('../controllers/presidente.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorizationMiddleware = require('../middlewares/authorization.middleware');
router.get('/view', authMiddleware, authorizationMiddleware.authorize('miembro_mesa'),  presidenteController.view);
router.post('/actualizar-estado-mesa',authMiddleware,authorizationMiddleware.authorize('miembro_mesa'), presidenteController.actualizarEstadoMesa);
router

module.exports = router;
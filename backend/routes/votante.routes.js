const express = require('express');
const router = express.Router();
const votanteController = require('../controllers/votante.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/view', authMiddleware, votanteController.view);
router.post('/votar',authMiddleware, votanteController.votar);


module.exports = router;
const router = require('express').Router();
const { crearCurso,reporteMes,reporteSemana,reporteDia } = require('../controllers/lider');
const { verifyAuth } =require('../controllers/auth');

router.post('/reporteMes', reporteMes);
router.post('/reporteSemana', reporteSemana);
router.post('/reporteDia', reporteDia);

router.put('/crearCurso/:id', crearCurso);

module.exports = router;
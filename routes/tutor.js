const router = require('express').Router();
const {obtenerTutores, cursosTutor, crearReporte,reporteTutor} = require('../controllers/tutor');
const { verifyAuth} = require('../controllers/auth');

router.get('/cursos', verifyAuth,cursosTutor);
router.get('/obtenerTutores', obtenerTutores);
router.get('/reporte/:yyyy',verifyAuth , reporteTutor);
router.post('/crearReporte', crearReporte);


module.exports = router;
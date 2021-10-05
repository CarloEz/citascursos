const router = require('express').Router();
const { solicitar, obtenercursos} = require('../controllers/empresa');
const {verifyAuth} = require('../controllers/auth');
 

router.post('/solicitar', verifyAuth ,solicitar);

router.get('/obtenerCursos', obtenercursos);


module.exports = router;
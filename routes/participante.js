const router = require('express').Router();
const {verHorario} = require('../controllers/participante');

 
router.get('/horario', verHorario);


module.exports = router;
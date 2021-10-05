const router = require('express').Router();
const { signIn, createUser, tableLider} = require('../controllers/auth');


router.post('/login', signIn);

router.post('/register', createUser);


module.exports = router;
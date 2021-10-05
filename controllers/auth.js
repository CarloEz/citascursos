const getquery = require('../db/connection');
const jwt = require('jsonwebtoken');
const User = require('../db/user');
const { TOKENSECRET } = process.env;
const ctrl = {};

ctrl.verifyAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }

        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const decode = jwt.verify(token, TOKENSECRET);

        console.log("decode verify jwt: ", decode, " EL DATE DE AHORA: ", Date.now());

        req.userId = decode['id'];

        next();

    } catch (error) {
        console.log("error en verify auth:", error);
    }
}


ctrl.signIn = async (req, res) => {
    let { correo, contraseña, cuenta } = req.body;
    let isChecked, result;

    if (cuenta == 'false') {
        cuenta = 'lider';
    }

    const sql = `select nombre,id${cuenta} as id,contraseña from ${cuenta} where correo=\'${correo}\'`;

    try {
        result = await getquery(sql);
        if (result.length > 0) {
            isChecked = await User.checkUser(contraseña, result[0].contraseña);
        }
        if (isChecked) {
            const token = jwt.sign({ id: result[0].id, cuenta:cuenta }, process.env.TOKENSECRET, { expiresIn: 3600000 });
            console.log("token de jwt: ", token);
            res.json({ msg: token, tipo:cuenta });
        } else {
            res.json({ error: 'Verifica contraseña o correo' });
        }
    } catch (e) {
        console.log(e.sqlMessage);
        res.json({ error: "Tenemos un inconveniente" });
    }
}


ctrl.createUser = async (req, res) => {
    let { nombre, correo, contraseña, cuenta } = req.body;

    if (cuenta == 'false') {
        cuenta = 'lider';
    }

    sql = `Insert into ${cuenta} set ?`;
    let user = new User(nombre, correo, contraseña);

    user.contraseña = await User.encriptar(user.contraseña);

    try {
        let result = await getquery(sql, user);

        if (result.affectedRows) {
            res.json({ msg: 'registro exitoso' });
        };

    } catch (error) {
        console.log(error);
        res.json({ msg: "error" })
    }
}

module.exports = ctrl;
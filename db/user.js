const bcrypt = require('bcrypt');

class User {

    constructor(nombre, correo, contraseña) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    static encriptar = async (llave) => {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        return await bcrypt.hash(llave, salt);
    }

    static checkUser = async (password, llave) => {
        return await bcrypt.compare(password, llave);
    }
}


module.exports = User;
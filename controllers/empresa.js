const query = require('../db/connection');
const ctrl = {};

ctrl.solicitar = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        console.log("userid:", req.userId);
        const sql = `insert into curso set ?`;

        const result = await query(sql, { "nombre": req.body.nombre, "idcliente": req.userId});

        console.log(result);
        if (result.affectedRows > 0) {
            res.json(result);
        } else {
            res.json({ error: "FALSE" });
        }

    } catch (e) {
        console.log(e.sqlMessage);
        res.json({ error: "FALSE" });
    }
}

ctrl.obtenercursos = async (req, res) => {
    try {
        const sql = `select * from curso`;
        const result = await query(sql);
        res.json(result);
    } catch (e) {
        res.json({ error: "FALSE" });
        console.log(e.sqlMessage);
    }
}

module.exports = ctrl;
const query = require('../db/connection');
const ctrl = {};

ctrl.crearCurso=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.params.id);
        const sql=`UPDATE curso set ? WHERE idcurso = ?`;

        const result= await  query(sql,[req.body,req.params.id]);

        if(result.affectedRows>0){
            res.json(result);
        }else{
            res.json({error:"FALSE"});
        }
    }catch(e){
        console.log(e.sqlMessage);
        res.json({error:"FALSE"});
    }
}

ctrl.reporteMes = async (req, res) => {
    try {
        console.log("reporteMes: ",req.body.mes);
        let mes = req.body.mes.substr(5);
        let año = req.body.mes.substring(0, 4);
        console.log("mes:",mes," año:",año);

        const sql = `select c.nombre as curso, c.fecha, c.hora, e.nombre as empresa, r.asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso 
        inner join cliente as e
        on c.idcliente=e.idcliente
        where c.idtutor=${req.body.idtutor} and MONTH(c.fecha)=${mes} and YEAR(c.fecha)=${año}
        order by c.fecha,c.hora asc`;

        const sqlMes = `select  MONTHNAME(c.fecha) mes, SUM(r.asistencia) as asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso
        where c.idtutor=${req.body.idtutor} and YEAR(c.fecha)=${año}
        group by MONTH(c.fecha)
        order by c.fecha asc`;

        const result = await query(sql);
        const datos = await query(sqlMes);
        console.log(result, datos);

        res.json({ "resultado": result, "datos": datos });
    } catch (e) {
        console.log(e.sqlMessage);
        res.json({ error: "FALSE" });
    }
}

ctrl.reporteSemana = async (req, res) => {
    try {
        console.log("reporteSemana: ",req.body);
        let semana = req.body.semana.substring(6,8);
        let año = req.body.semana.substring(0, 4);

        console.log("semana:",semana," año:",año);

        const sql = `select c.nombre as curso, c.fecha, c.hora, e.nombre as empresa, r.asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso 
        inner join cliente as e
        on c.idcliente=e.idcliente
        where c.idtutor=${req.body.idtutor} and Week(c.fecha)=${semana} and YEAR(c.fecha)=${año}
        order by c.fecha,c.hora asc`;

        const sqlSemana = `select WEEK(c.fecha) semana, SUM(r.asistencia) as asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso
        where c.idtutor=${req.body.idtutor}
        group by WEEK(c.fecha)
        order by c.fecha asc`;

        const result = await query(sql);
        const datos = await query(sqlSemana);
        console.log(result, datos);

        res.json({ "resultado": result, "datos": datos });
    } catch (e) {
        console.log(e.sqlMessage);
        res.json({ error: "FALSE" });
    }
}

ctrl.reporteDia =async (req,res)=>{
    try {
        console.log("reporteDia: ",req.body);

        const sql = `select c.nombre as curso, c.fecha, c.hora, e.nombre as empresa, r.asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso 
        inner join cliente as e
        on c.idcliente=e.idcliente
        where c.idtutor=${req.body.idtutor} and c.fecha='${req.body.dia}'
        order by c.fecha,c.hora asc`;

        const sqlDia=`select c.fecha, SUM(r.asistencia) as asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso
        where c.idtutor=${req.body.idtutor}
        group by c.fecha
        order by c.fecha asc`;

        const result = await query(sql);
        const datos = await query(sqlDia);
        console.log(result, datos);

        res.json({ "resultado": result, "datos": datos });
    } catch (e) {
        console.log(e);
        res.json({ error: "FALSE" });
    }
}

module.exports = ctrl;
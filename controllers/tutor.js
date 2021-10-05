const query = require('../db/connection');
const ctrl = {};

ctrl.obtenerTutores=async(req,res)=>{
    try{
        const sql=`Select idtutor,nombre from tutor`;
        const result= await  query(sql);
        res.json(result);
    }catch(e){
        console.log(e.sqlMessage);
        res.json({error:"FALSE"});
    }
}

ctrl.cursosTutor=async(req,res)=>{
    try{
        const sql=`Select * from curso where idtutor= ${req.userId} order by fecha, hora asc`;
        const result= await  query(sql);
        res.json(result);   
    }catch(e){
        console.log(e.sqlMessage);
        res.json({error:"FALSE"});
    }
}



/* TENGO QUE CREAR REPORTE DE LOS TEMAS */
ctrl.crearReporte = async(req,res)=>{
    try{
        console.log(req.body);
        const sql=`Insert into reporte set ?`;
        const result= await  query(sql,{idcurso:req.body.idcurso,asistencia:req.body.asistencia});

        if(result.affectedRows>0){
            res.json({msg:"Reporte generado"});
        }
    }catch(e){
        console.log(e.sqlMessage);
        res.json({error:"FALSE"});
    }
}

ctrl.reporteTutor = async (req, res) => {
    try {
        const sql = `select c.nombre as curso, c.fecha, c.hora, e.nombre as empresa, r.asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso 
        inner join cliente as e
        on c.idcliente=e.idcliente
        where c.idtutor=${req.userId} and YEAR(c.fecha)=${req.params.yyyy}
        order by c.fecha,c.hora asc`;

        const sqlDato = `select MONTHNAME(c.fecha) as mes, SUM(r.asistencia) as asistencia from reporte as r 
        inner join curso as c 
        on r.idcurso=c.idcurso
        where c.idtutor=${req.userId} and YEAR(c.fecha)=${req.params.yyyy}
        group by MONTH(c.fecha)
        order by c.fecha asc`;

        const result = await query(sql);
        const datos = await query(sqlDato);
        console.log(result, datos);

        res.json({ "resultado": result, "datos": datos });
    } catch (e) {
        console.log(e.sqlMessage);
        res.json({ error: "FALSE" });
    }
}

module.exports = ctrl;
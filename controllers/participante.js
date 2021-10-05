const query = require('../db/connection');
const ctrl = {};

ctrl.verHorario=async(req,res)=>{
    try{
        const sql=`select c.nombre,c.fecha,c.hora,t.nombre as tutor from curso as c inner join tutor as t on c.idtutor=t.idtutor where estado=1 order by fecha,hora asc;`;

        const result= await  query(sql);

        res.json(result);
    }catch(e){
        console.log(e);
        res.json({error:"FALSE"});
    }
}

module.exports = ctrl;
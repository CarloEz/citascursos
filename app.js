const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
var cors = require('cors');
const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors({origin:"*"}));
app.set('PORT', 3000 | process.env.PORT);
app.use(express.json());

//routers
app.use('/auth',require('./routes/auth'));
app.use('/empresa',require('./routes/empresa'));
app.use('/lider',require('./routes/lider'));
app.use('/tutor',require('./routes/tutor'));
app.use('/participante',require('./routes/participante'));


//running server
app.listen( app.get('PORT'),()=>{
    console.log(`Server listening in port ${app.get('PORT')}`);
})
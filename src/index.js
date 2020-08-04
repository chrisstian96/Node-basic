 // Modulo necesarios para el servidor
 const express = require('express');
 const app = express();
 const path = require('path');
 const morgan = require('morgan');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const helmet = require('helmet');


// Conexión con la base de datos
 mongoose.connect('mongodb://localhost/apiproject', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
});

 // Definición de rutas
 const index = require('./routes/index.routes.js');
 const users = require('./routes/users.routes.js');
 const cars = require('./routes/cars.routes.js');


 // Middlewares
 app.use(morgan('dev'));
 app.use(helmet());
 app.use(bodyParser.json());

 // Rutas URL
 app.get('/', index);
 app.use('/users',users);
 app.use('/cars',cars);


 // Catch 404 Errors and forward then to error handler
 app.use((request, response, next)=>{
    const err = new Error('No se encontro la dirección');
    err.status =  404;
    next(err);
 });

 app.use((err, request, response, next)=>{
    const error = app.get('env') === 'development' ? err: {};
    const status = err.status || 500;

    // Respuesta al cliente
    response.status(status).json({
        error:{
            message: error.message,
        }
    });

    // Respuesta al servidor
    console.error(err);

 });


 // Iniciar servidor
 const port = app.get('port') || 3000;
 app.listen(port, () => {
     console.log( `Servidor iniciado en el puerto ${port}`)
 });
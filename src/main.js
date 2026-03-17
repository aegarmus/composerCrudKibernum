/* const express = require("express"); */ // commonJS -> nativo de Node -> más antiguo

import express from 'express' // ES modules -> es el modelo de ES6 -> es más moderno -> es más recomendado
import dataRouter from './routes/routes.js'
import { errorHandler } from './middlewares/error.middleware.js';

const app = express()

app.use(express.json());

app.use('/api/v1', dataRouter)
//Middleware para manejar errores
app.use(errorHandler)

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
})

/* const express = require("express"); */ // commonJS -> nativo de Node -> más antiguo

import express from 'express' // ES modules -> es el modelo de ES6 -> es más moderno -> es más recomendado
import { env } from './config/env.config.js'

import appRouter from './routes/index.js'
import { errorHandler } from './middlewares/error.middleware.js';
import { verifyConnectionEmail } from './config/mail.config.js';
import { Logger } from './utils/logger.util.js';

const app = express()
const logger = new Logger('SERVER')


app.use(express.json());

app.use('/api/v1', appRouter)
//Middleware para manejar errores
app.use(errorHandler)

app.listen(env.port, async() => {
    try {
        await verifyConnectionEmail()
        logger.info('El transportador de correos esta listo para operar')
    } catch (error) {
        logger.error(`Problemas con el transportador de correos: ${JSON.stringify(error)}`)
    }
    logger.info(`Servidor escuchando en el puerto ${env.port}`);
})

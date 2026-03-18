import nodemailer from 'nodemailer'
import { env } from './env.config.js'
import { Logger } from '../utils/logger.util.js'
import { EmailError } from '../utils/errors.util.js'

const { mail: { host, port, secure, user, pass } } = env


const logger = new Logger('EMAIL')

export const transporter = nodemailer.createTransport({
    host,
    port, // Ya viene como número desde env.config
    secure, // Ya viene como boolean desde env.config
    auth: { user, pass },
})

export const verifyConnectionEmail = async() => {
    try {
        logger.info('Inicializando conexión con el servicio de email')
        await transporter.verify()
        logger.info('Conexión exitosa con el servidor de correos')
    } catch (error) {
        logger.error(`Error al conectar con el servidor de correos: ${JSON.stringify(error)}`);
        throw new EmailError('Error de conexión con el servidor de email', JSON.stringify(error))
    }
}
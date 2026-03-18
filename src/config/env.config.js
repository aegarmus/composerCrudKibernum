import dotenv from 'dotenv'

dotenv.config()

export const env = {
    port: Number(process.env.PORT),
    env: process.env.ENVIROMENT || 'development',
    mail: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAIL_SECURE === 'true',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}
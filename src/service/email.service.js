import { Logger } from "../utils/logger.util.js";
import { env } from "../config/env.config.js";
import { transporter } from "../config/mail.config.js";
import { EmailError } from "../utils/errors.util.js";

export class EmailService {
    static logger = new Logger('EMAIL_SERVICE')
    static #user = env.mail.user

    static async send({ to, subject, message }) {
        try {
            this.logger.info('Inicializando configuración del email')
            const mailOptions = {
                from: this.#user,
                to: to.join(', '),
                subject,
                text: message,
                html: this.htmlTemplate(message)
            }
            this.logger.debug(`Configuración realizada:  to: ${(mailOptions.to)}, subject: ${mailOptions.subject}, message: ${mailOptions.text}`)

            this.logger.info('Enviando configuración al transportador');
            const infoData = await transporter.sendMail(mailOptions)
            this.logger.info(`Mail enviada por el transportador -> id: ${infoData.messageId}`);
            return infoData
        } catch (error) {
            this.logger.error(`Error al enviar el correo: ${JSON.stringify(error)}`);
            throw new EmailError('Error al enviar el correo', JSON.stringify(error))
        }
    }

    static htmlTemplate(message) {
        return `
            <div style="background: #00f; color: #fff">
                ${message}
            </div>
        
        `
    }
}
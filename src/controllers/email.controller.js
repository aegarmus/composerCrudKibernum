import { EmailService } from "../service/email.service.js";


export class EmailController {
    static async send(req, res, next) {
        try {
            const emailData = await EmailService.send(req.body)

            res.status(200).json({
                message: 'Email envaido con éxito',
                statusCode: 200,
                data: emailData
            })
        } catch (error) {
            next(error)
        }
    }
}
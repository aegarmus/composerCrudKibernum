import { Router } from "express";
import { EmailController } from "../controllers/email.controller.js";

const router = Router()

router.post('/', EmailController.send)

export default router
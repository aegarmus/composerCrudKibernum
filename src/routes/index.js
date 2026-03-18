import { Router } from "express";
import routerComposer from './composer.routes.js'
import routerMail from './email.routes.js'

const router = Router()

router.use("/composers", routerComposer);
router.use('/mail', routerMail)

export default router
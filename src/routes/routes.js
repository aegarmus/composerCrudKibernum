import { Router } from "express";
import { ComposerController } from "../controllers/composer.controller.js";

const router = Router();

router.post("/composers", ComposerController.create);
router.get("/composers", ComposerController.getAllData);
router.get("/composers/:id", ComposerController.getByID);
router.put("/composers/:id", ComposerController.update);
router.delete("/composers/:id", ComposerController.delete);

export default router;

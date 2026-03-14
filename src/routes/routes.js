import { Router } from "express";
import { ComposerController } from "../controllers/composer.controller.js";

const router = Router();

router.post("/composers", ComposerController.create);
router.get("/composers/admin", ComposerController.getAllData);
router.get("/composers", ComposerController.getAllActive)
router.get("/composers/admin/:id", ComposerController.getByID);
router.get("/composers/:id", ComposerController.getActiveByID);
router.put("/composers/admin/:id", ComposerController.update);
router.put("/composers/:id", ComposerController.updateActive);
router.delete("/composers/admin/:id", ComposerController.permaDelete);
router.delete("/composers/:id", ComposerController.delete)

export default router;

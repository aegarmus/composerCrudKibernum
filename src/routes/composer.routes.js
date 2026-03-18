import { Router } from "express";
import { ComposerController } from "../controllers/composer.controller.js";

const router = Router();

router.post("/", ComposerController.create);
router.get("/admin", ComposerController.getAllData);
router.get("/", ComposerController.getAllActive)
router.get("/admin/:id", ComposerController.getByID);
router.get("/:id", ComposerController.getActiveByID);
router.put("/admin/:id", ComposerController.update);
router.put("/:id", ComposerController.updateActive);
router.delete("/admin/:id", ComposerController.permaDelete);
router.delete("/:id", ComposerController.delete)
router.patch("/:id", ComposerController.restore)

export default router;

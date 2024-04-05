import express, { Request, Response } from "express";
import { PlayerController } from "../controllers/playerController";
import { ensureAuth } from "../middlewares/authenticated";
import validateSchema from "../middlewares/validationSchema";
import {
  createPlayerSchema,
  updatePlayerSchema,
} from "../validators/playerValidator";

const router = express.Router();
router.post(
  "/player",
  validateSchema(createPlayerSchema),
  [ensureAuth],
  PlayerController.createPlayer
);
export default router;

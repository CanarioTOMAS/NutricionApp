import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { TeamController } from "../controllers/teamController";
import { ensureAuth } from "../middlewares/authenticated";
import validateSchema from "../middlewares/validationSchema";
import {
  createTeamSchema,
  updateTeamSchema,
} from "../validators/teamValidator";

const router = express.Router();
router.post(
  "/team",
  validateSchema(createTeamSchema),
  [ensureAuth],
  TeamController.createTeam
);
router.get(
  "/team/:id",
  param("id").isMongoId(),
  [ensureAuth],
  TeamController.getTeam
);
router.get("/teams", [ensureAuth], TeamController.getAllTeam);
router.put(
  "/team/:id",
  validateSchema(updateTeamSchema),
  [ensureAuth],
  TeamController.updateTeam
);
router.delete(
  "/team/:id",
  param("id").isMongoId(),
  [ensureAuth],
  TeamController.deleteTeam
);
export default router;

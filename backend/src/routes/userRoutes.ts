import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { UserController } from "../controllers/userController";
import { ensureAuth } from "../middlewares/authenticated";
import {
  createUserSchema,
  getUserLogin,
  updateUserSchema,
} from "../validators/userValidator";
import validateSchema from "../middlewares/validationSchema";
const router = express.Router();

router.get("/users", [ensureAuth], UserController.getAllUsers);
router.get(
  "/user/:id",
  param("id").isMongoId(),
  [ensureAuth],
  UserController.getUserById
);
router.post(
  "/register",
validateSchema(createUserSchema),
  UserController.createUser
);
router.put(
  "/user/:id",
  validateSchema(updateUserSchema),
  [ensureAuth],
  UserController.updateUser
);
router.delete(
  "/user/:id",
  [ensureAuth],
  UserController.deleteUser
);
router.post("/login",validateSchema(getUserLogin), UserController.loginUser);
export default router;

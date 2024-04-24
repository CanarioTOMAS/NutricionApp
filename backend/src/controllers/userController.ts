import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/userModel";
import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import { UserService } from "../services/userService";

export const UserController = {
  async getAllUsers(req: Request, res: Response) {
    const userService = UserService.getAllUsers();
    userService
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        logger.error(`Error al obtener usuarios: ${error}`);
        res.status(500).json({ menssage: "Error al obtener usuarios" });
      });
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userService = UserService.getUserById(id);
    userService
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        logger.error(`Error al obtener el usuario: ${error}`);
        res.status(500).json({ message: "Error al obtener el usuario" });
      });
  },

  async createUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });
    } else {
      const userService = UserService.createUser(email, password);
      userService
        .then((user) => {
          res.status(200).json(`Usuario creado correctamente`);
        })
        .catch((error) => {
          logger.error(`Error al crear el usuario: ${error}`);
          res.status(500).json({ message: "Error al crear el usuario" });
        });
    }
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, status, role, address, placeOfBirth, gender, phone } =
      req.body;

    const userService = UserService.updateUser(
      id,
      name,
      status,
      role,
      address,
      placeOfBirth,
      gender,
      phone
    );

    userService
      .then((user) => {
        res
          .status(200)
          .json({ message: `Usuario actualizado correctamente: ${user}` });
      })
      .catch((error) => {
        logger.error(`Error al actualizar el usuario: ${error}`);
        res.status(500).json({ message: "Error al actualizar el usuario" });
      });
  },
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userService = UserService.deleteUser(id);

    userService
      .then(() => {
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      })
      .catch((error) => {
        logger.error(`Error al eliminar el usuario ${error}`);
        res.status(500).json({ message: "Error al eliminar el usuario" });
      });
  },
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const userService = UserService.login(email, password);

    userService
      .then((token) => {
        res.status(200).json({ token });
      })
      .catch((error) => {
        logger.error(`Error al iniciar sesion ${error}`);
        res.status(500).json({ message: "Error al iniciar session" });
      });
  },
};

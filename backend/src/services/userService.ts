import { User, UserDocument } from "../models/userModel";
import { logger } from "../utils/logger";
import bcrypt from 'bcrypt';
import {createToken}  from '../controllers/jwtHandler'

export const UserService = {
  async getAllUsers(): Promise<UserDocument[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      logger.error(`Error al obtener usuarios: ${error}`);
      throw new Error("Error al obtener usuarios");
    }
  },

  async getUserById(id: string): Promise<UserDocument | null> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      logger.error(`Error al obtener usuario por ID: ${error}`);
      throw new Error("Error al obtener usuario por ID");
    }
  },

  async createUser(email: string, password: string): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password:hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      logger.error(`Error al crear usuario: ${error}`);
      throw new Error("Error al crear usuario");
    }
  },

  async updateUser(
    id: string,
    name: string,
    status:string,
    role:string,
    address:string,
    placeOfBirth:string,
    gender:string,
    phone:string,
  ): Promise<UserDocument| null> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name,status,role,address,placeOfBirth,gender,phone },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      logger.error(`Error al actualizar usuario: ${error}`);
      throw new Error("Error al actualizar usuario");
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await User.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`Error al eliminar usuario: ${error}`);
      throw new Error("Error al eliminar usuario");
    }
  },

  async login(email:string, password:string): Promise<string>{
    try {
      const user = await User.findOne({ email });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = createToken(user);
          return token;
        } else {    
          logger.error(`Contraseña incorrecta`);
          throw new Error('Contraseña incorrecta');
        }
      } else {
        logger.error(`Usuario no encontrado`);
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      logger.error(`Error al iniciar sesión: ${error}`);
      throw new Error('Error al iniciar sesión');
    }
  }
};

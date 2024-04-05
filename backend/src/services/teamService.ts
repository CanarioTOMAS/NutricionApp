import mongoose from "mongoose";
import { Team, TeamDocument } from "../models/teamModel";
import { logger } from "../utils/logger";
import { Player } from "../models/playerModel";

export const TeamService = {
  async createTeam(
    name: string,
    description: string,
    userId: string
  ): Promise<TeamDocument> {
    try {
      const newTeam = new Team({
        name,
        description,
        userId: new mongoose.Types.ObjectId(userId),
      });
      await newTeam.save();
      await Player.findByIdAndUpdate(userId, { $push: { teams: newTeam._id } });
      return newTeam;
    } catch (error) {
      logger.error(`Error al crear usuario: ${error}`);
      throw new Error("Error al crear usuario");
    }
  },
  async getTeamById(id: string): Promise<TeamDocument | null> {
    try {
      const team = Team.findById(id);
      return team;
    } catch (error) {
      logger.error(`Error al obtener el equipo por ID: ${error}`);
      throw new Error("Error al obtener el equipo por ID");
    }
  },
  async getAllTeam(userId: string): Promise<TeamDocument[] | null> {
    try {
      const teams = Team.find({ userId });
      return teams;
    } catch (error) {
      logger.error(`Error al obtener los equipos: ${error}`);
      throw new Error("Error al obtener los equipos");
    }
  },
  async updateTeam(
    id: string,
    name: string,
    description:string
  ): Promise<TeamDocument| null> {
    try {
      const updatedTeam = await Team.findByIdAndUpdate(
        id,
        { name,description},
        { new: true }
      );
      return updatedTeam;
    } catch (error) {
      logger.error(`Error al actualizar el equipo: ${error}`);
      throw new Error("Error al actualizar equipo");
    }
  },
  async deleteTeam(id: string): Promise<void> {
    try {
      await Team.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`Error al eliminar equipo: ${error}`);
      throw new Error("Error al eliminar equipo");
    }
  },
};

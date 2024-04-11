import mongoose from "mongoose";
import { OpposingTeam, OpposingTeamDocument } from "../models/opposingTeamModel";
import { logger } from "../utils/logger";
import { Team } from "../models/teamModel";

export const OpposingTeamService = {
  async createOpposingTeam(
    name: string,
    teamId: string
  ): Promise<OpposingTeamDocument> {
    try {
      const newOpposingTeam = new OpposingTeam({
        name,
        ownGoals:0,
        againstGoals:0,
        totalGoals:0,
        teamId: new mongoose.Types.ObjectId(teamId),
      });
      await newOpposingTeam.save();
      await Team.findByIdAndUpdate(teamId, { $push: { opposingTeams: newOpposingTeam._id } });
      return newOpposingTeam;
    } catch (error) {
      logger.error(`Error al crear el rival: ${error}`);
      throw new Error("Error al crear rival");
    }
  },
  async getOpposingTeamById(id: string): Promise<OpposingTeamDocument | null> {
    try {
      const opposingTeam = OpposingTeam.findById(id);
      return opposingTeam;
    } catch (error) {
      logger.error(`Error al obtener el rival por ID: ${error}`);
      throw new Error("Error al obtener el rival por ID");
    }
  },
  async getAllOpposingTeam(teamId: string): Promise<OpposingTeamDocument[] | null> {
    try {
      const opposingTeams = OpposingTeam.find({ teamId });
      return opposingTeams;
    } catch (error) {
      logger.error(`Error al obtener los rivals: ${error}`);
      throw new Error("Error al obtener los rivals");
    }
  },
  async updateOpposingTeam(
    id: string,
    name: string,

  ): Promise<OpposingTeamDocument | null> {
    try {
      const updatedOpposingTeam = await OpposingTeam.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      return updatedOpposingTeam;
    } catch (error) {
      logger.error(`Error al actualizar el rival: ${error}`);
      throw new Error("Error al actualizar rival");
    }
  },
  async deleteOpposingTeam(id: string): Promise<void> {
    try {
      await OpposingTeam.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`Error al eliminar rival: ${error}`);
      throw new Error("Error al eliminar rival");
    }
  },
};

import mongoose from "mongoose";
import { Player, PlayerDocument } from "../models/playerModel";
import { logger } from "../utils/logger";
import { Team } from "../models/teamModel";

export const PlayerService = {
  async createPlayer(
    name: string,
    surname: string,
    teamId: string,
    dni:string
  ): Promise<PlayerDocument> {
    try {
      const newPlayer = new Player({
        name,
        surname,
        teamId: new mongoose.Types.ObjectId(teamId),
        dni
      });
      await newPlayer.save();
      await Team.findByIdAndUpdate(teamId, { $push: { players: newPlayer._id } });
      return newPlayer;
    } catch (error) {
      logger.error(`Error al crear el jugador: ${error}`);
      throw new Error("Error al crear jugador");
    }
  },
};

import mongoose from "mongoose";
import { Player, PlayerDocument } from "../models/playerModel";
import { logger } from "../utils/logger";
import { Team } from "../models/teamModel";

export const PlayerService = {
  async createPlayer(
    name: string,
    surname: string,
    teamId: string,
    dni: string
  ): Promise<PlayerDocument> {
    try {
      const newPlayer = new Player({
        name,
        surname,
        teamId: new mongoose.Types.ObjectId(teamId),
        dni,
      });
      await newPlayer.save();
      await Team.findByIdAndUpdate(teamId, {
        $push: { players: newPlayer._id },
      });
      return newPlayer;
    } catch (error) {
      logger.error(`Error al crear el jugador: ${error}`);
      throw new Error("Error al crear jugador");
    }
  },
  async updatePlayer(
    id: string,
    name: string,
    surname: string
  ): Promise<PlayerDocument | null> {
    try {
      const updatedPlayer = await Player.findByIdAndUpdate(
        id,
        { name, surname },
        { new: true }
      );
      return updatedPlayer;
    } catch (error) {
      logger.error(`Error al actualizar el jugador: ${error}`);
      throw new Error("Error al actualizar jugador");
    }
  },
  async deletePlayer(id: string): Promise<void> {
    try {
      await Player.findByIdAndDelete(id);
      logger.info("Jugador borrado exitosamente");
    } catch (error) {
      logger.error(`Error al eliminar el jugador: ${error}`);
      throw new Error("Error al eliminar el jugador");
    }
  },
  async getUserById(id: string): Promise<PlayerDocument | null> {
    try {
      const player = Player.findById(id);
      return player;
    } catch (error) {
      logger.error(`Error al obtener el jugador: ${error}`);
      throw new Error("Error al obtener el jugador");
    }
  },
  async getAllPlayers(teamId: string): Promise<PlayerDocument[] | null> {
    try {
      const player = Player.find({ teamId });
      return player;
    } catch (error) {
      logger.error(`Error al obtener los jugadores: ${error}`);
      throw new Error("Error al obtener los jugadores");
    }
  },
};

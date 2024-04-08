import { Player } from "../models/playerModel";
import { getDataToken } from "./jwtHandler";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { PlayerService } from "../services/playerService";
import { Team } from "../models/teamModel";

export const PlayerController = {
  async createPlayer(req: Request, res: Response): Promise<void> {
    const { name, surname, dni, teamId } = req.body;
    const existingPlayer = await Player.findOne({ dni });
    if (existingPlayer) {
      res.status(400).json({ message: "Ya existe un jugador con ese dni" });
    } else {
      const playerService = PlayerService.createPlayer(
        name,
        surname,
        teamId,
        dni
      );
      playerService
        .then((player) => {
          res.status(200).json(player);
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al añadir el jugador" });
          logger.error(`Error al añadir el jugador: ${error}`);
        });
    }
  },
  async updatePlayer(req: Request, res: Response): Promise<void> {
    const { name, surname } = req.body;
    const { id } = req.params;
    const playerService = PlayerService.updatePlayer(id, name, surname);
    playerService
      .then((player) => {
        res.status(200).json(player);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar el jugador" });
        logger.error(`Error al actualizar el jugador: ${error}`);
      });
  },
  async deletePlayer(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const playerService = PlayerService.deletePlayer(id);
    playerService
      .then(() => {
        res.status(200).json({ message: "El jugador fue eliminado con exito" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar el jugador" });
        logger.error(`Error al actualizar el jugador: ${error}`);
      });
  },
  async getPlayer(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const playerService = PlayerService.getUserById(id);
    playerService
      .then((player) => {
        res.status(200).json(player);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al obtener el jugador" });
        logger.error(`Error al obtener el jugador: ${error}`);
      });
  },
  async getAllPlayer(req: Request, res: Response): Promise<void> {
    const { teamId } = req.body;
    const playerService = PlayerService.getAllPlayers(teamId);
    playerService
      .then((players) => {
        res.status(200).json(players);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al obtener los jugadores" });
        logger.error(`Error al obtener los jugadores: ${error}`);
      });
  },
};

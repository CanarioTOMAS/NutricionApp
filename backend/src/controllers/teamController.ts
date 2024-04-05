import { Team } from "../models/teamModel";
import { TeamService } from "../services/teamService";
import { logger } from "../utils/logger";
import { getDataToken } from "./jwtHandler";
import { Request, Response } from "express";

export const TeamController = {
  async createTeam(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    const tokenPayload = getDataToken(req.headers.authorization);
    const userId = tokenPayload.sub;
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      res
        .status(400)
        .json({ message: "El nombre del equipo no esta disponible" });
    } else {
      const teamService = TeamService.createTeam(name, description, userId);
      teamService
        .then((team) => {
          res.status(200).json(team);
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al crear el Equipo" });
          logger.error(`Error al crear el equipo: ${error}`);
        });
    }
  },
  async getTeam(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const teamService = TeamService.getTeamById(id);
    teamService
      .then((team) => {
        res.status(200).json(team);
      })
      .catch((error) => {
        res.status(500).json({ menssage: "Error al obtener el equipo" });
        logger.error(`Error al obtener el equipo: ${error}`);
      });
  },
  async getAllTeam(req: Request, res: Response): Promise<void> {
    const tokenPayload = getDataToken(req.headers.authorization);
    const userId = tokenPayload.sub;
    const teamService = TeamService.getAllTeam(userId);
    teamService
      .then((teams) => {
        res.status(200).json(teams);
      })
      .catch((error) => {
        res.status(500).json({ menssage: "Error al obtener los equipos" });
        logger.error(`Error al obtener el equipo: ${error}`);
      });
  },
  async updateTeam(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description } = req.body;

    const teamService = TeamService.updateTeam(id, name, description);
    teamService
      .then((team) => {
        res
          .status(200)
          .json({ message: `Equipo actualizado correctamente: ${team}` });
      })
      .catch((error) => {
        logger.error(`Error al actualizar el equipo: ${error}`);
        res.status(500).json({ message: "Error al actualizar el equipo" });
      });
  },
  async deleteTeam(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const teamService = TeamService.deleteTeam(id);

    teamService
      .then(() => {
        res.status(200).json({ message: "Equipo eliminado correctamente" });
      })
      .catch((error) => {
        logger.error(`Error al eliminar el equipo ${error}`);
        res.status(500).json({ message: "Error al eliminar el equipo" });
      });
  },
};

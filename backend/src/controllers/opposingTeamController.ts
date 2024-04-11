import { Request, Response } from "express";
import { OpposingTeamService } from "../services/opposingTeamService";
import { logger } from "../utils/logger";
import { OpposingTeam } from "../models/opposingTeamModel";

export const OpposingTeamController = {
  async createOpposingTeam(req: Request, res: Response): Promise<void> {
    const { name, teamId } = req.body;
    const existingOpposingTeam = await OpposingTeam.findOne({ name });
    if (existingOpposingTeam) {
      res.status(400).json({ menssage: "El nombre de la temporada ya existe" });
    } else {
      const opposingTeamService = OpposingTeamService.createOpposingTeam(
        name,
        teamId
      );
      opposingTeamService
        .then((opposingTeam) => {
          res.status(200).json(opposingTeam);
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al crear el equipo" });
          logger.error(`Error al crear el equipo: ${error}`);
        });
    }
  },
  async updateOpposingTeam(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const { id } = req.params;
    const opposingTeamService = OpposingTeamService.updateOpposingTeam(
      id,
      name
    );
    opposingTeamService
      .then((opposingTeam) => {
        res
          .status(200)
          .json({
            message: `Equipo actualizado correctaente: ${opposingTeam}`,
          });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar el equipo" });
        logger.error(`Error al actualizar el equipo: ${error}`);
      });
  },
  async deleteOpposingTeam(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const opposingTeamService = OpposingTeamService.deleteOpposingTeam(id);
    opposingTeamService
      .then(() => {
        res.status(200).json({ message: "Equipo actualizado correctamente" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al eliminar el equipo" });
        logger.error(`Error al eliminar el equipo: ${error}`);
      });
  },
  async getOpposingTeam(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const opposingTeamService = OpposingTeamService.getOpposingTeamById(id);
    opposingTeamService
      .then((opposingTeam) => {
        res.status(200).json(opposingTeam);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al obtener el equipo" });
        logger.error(`Error al obtener el equipo: ${error}`);
      });
  },
  async getOpposingTeams(req: Request, res: Response): Promise<void> {
    const { teamId } = req.body;
    const opposingTeamService = OpposingTeamService.getAllOpposingTeam(teamId);
    opposingTeamService
      .then((opposingTeam) => {
        res.status(200).json(opposingTeam);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al obtener los equipos" });
        logger.error(`Error al obtener los equipos: ${error}`);
      });
  },
};

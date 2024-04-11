import { Request, Response } from "express";
import { SeasonService } from "../services/seasonService";
import { Season } from "../models/seasonModel";
import { logger } from "../utils/logger";

export const SeasonController = {
  async createSeason(req: Request, res: Response): Promise<void> {
    const { name, startDate, teamId } = req.body;
    const existingSeason = await Season.findOne({ name });
    if (existingSeason) {
      res.status(400).json({ menssage: "El nombre de la temporada ya existe" });
    } else {
      const seasonService = SeasonService.createSeason(name, startDate, teamId);
      seasonService
        .then((season) => {
          res.status(200).json(season);
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al crear la temporada" });
          logger.error(`Error al crear la temporda: ${error}`);
        });
    }
  },
  async updateSeason(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, endDate } = req.body;
    const seasonService = SeasonService.updateSeason(id, name, endDate);
    seasonService
      .then((season) => {
        res
          .status(200)
          .json({ message: `Temporada actualizada correctamente: ${season}` });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar la temporada" });
        logger.error(`Error al actualizar la temporda: ${error}`);
      });
  },
  async deleteSeason(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const seasonService = SeasonService.deleteSeason(id);
    seasonService
      .then(() => {
        res.status(200).json({ message: "Equipo eliminado correctamente" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar la temporada" });
        logger.error(`Error al actualizar la temporda: ${error}`);
      });
  },
  async getSeason(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const seasonService = SeasonService.getSeasonById(id);
    seasonService
      .then((season) => {
        res.status(200).json(season);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al obtener la temporada" });
        logger.error(`Error al obtener la temporda: ${error}`);
      });
  },
  async getAllSeason(req: Request, res: Response): Promise<void> {
    const { teamId } = req.body;
    const seasonService = SeasonService.getAllSeason(teamId);
    seasonService
      .then((seasons) => {
        res.status(200).json(seasons);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al obtener las temporadas" });
        logger.error(`Error al obtener las tempordas: ${error}`);
      });
  }
};

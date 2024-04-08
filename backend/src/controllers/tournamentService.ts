import { TournamentService } from "../services/tournamentService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
export const TournamentController = {
  async createTournament(req: Request, res: Response): Promise<void> {
    const { seasonId, name } = req.body;
    const tournamentService = TournamentService.createTournament(
      name,
      seasonId
    );
    tournamentService
      .then((tournament) => {
        res.status(200).json(tournament);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al añadir el torneo" });
        logger.error(`Error al añadir el torneo: ${error}`);
      });
  },

  async updateTournament(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const { id } = req.params;

    const tournamentService = TournamentService.updateTournament(name, id);
    tournamentService
      .then((tournament) => {
        res
          .status(200)
          .json({ message: `Torneo actualizadocon exito ${tournament}` });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error al actualizar el torneo" });
        logger.error(`Error al añadir el torneo: ${error}`);
      });
  },
  
  async deleteTournament(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tournamentService = TournamentService.deleteTournamen(id);
    tournamentService
      .then(() => {
        res.status(200).json({ message: "Torneo eliminado con exito" });
      })
      .catch((error) => {
        res.status(500).json({ message: "No se pudo eliminar el torneo" });
        logger.error(`Error al eliminar el torneo: ${error}`);
      });
  },

  async getTournament(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const tournamentService = TournamentService.getTournamentById(id);
    tournamentService
      .then((tournament) => {
        res.status(200).json(tournament);
      })
      .catch((error) => {
        res.status(500).json({ message: "No se pudo obtener el torneo" });
        logger.error(`Error al obtener el torneo: ${error}`);
      });
  },
  
  async getTournaments(req: Request, res: Response): Promise<void> {
    const { seasonId } = req.body;
    const tournamentService = TournamentService.getAllTournament(seasonId);
    tournamentService
      .then((tournaments) => {
        res.status(200).json(tournaments);
      })
      .catch((error) => {
        res.status(500).json({ message: "No se pudo obtener los torneos" });
        logger.error(`Error al obtener los torneos: ${error}`);
      });
  },
};

import mongoose from "mongoose";
import { Tournament, TournamentDocument } from "../models/tournamentModel";
import { logger } from "../utils/logger";

export const TournamentService ={
    async createTournament(
        name:string,
        seasonId:string,
      ): Promise<TournamentDocument> {
        try {
          const newTournament = new Tournament({
            name,
            seasonId: new mongoose.Types.ObjectId(seasonId),
          });
          await newTournament.save();
          await Tournament.findByIdAndUpdate(seasonId, {
            $push: { tournaments: newTournament._id },
          });
          return newTournament;
        } catch (error) {
          logger.error(`Error al crear el torneo: ${error}`);
          throw new Error("Error al crear torneo");
        }
      }, 
    async updateTournament(name:string,id:string):Promise<TournamentDocument |null>{
        try{
            const updatedTournament = await Tournament.findByIdAndUpdate(
                id,
                { name },
                { new: true }
              );
              return updatedTournament;
        }catch(error){
            logger.error(`Error al actualizar el torneo: ${error}`);
            throw new Error("Error al actualizar el torneo");
        }
    },
    async deleteTournamen(id:string):Promise<void>{
        try {
            await Tournament.findByIdAndDelete(id);
            logger.info("Torneo borrado exitosamente");
          } catch (error) {
            logger.error(`Error al eliminar el torneo: ${error}`);
            throw new Error("Error al eliminar el torneo");
          }
    },
    async getTournamentById(id:string):Promise<TournamentDocument|null>{
        try{
            const tournament = Tournament.findById(id);
            return tournament;
        }catch(error){
            logger.error(`Error al obtener el torneo: ${error}`);
            throw new Error("Error al obtener el torneo");
        }
    },
    async getAllTournament(seasonId:string):Promise<TournamentDocument[]>{
        try{
            const tournament = Tournament.find({ seasonId });
            return tournament;
        }catch(error){
            logger.error(`Error al obtener los torneos: ${error}`);
            throw new Error("Error al obtener los torneos");
        }
    }
}
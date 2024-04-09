import mongoose from "mongoose";
import { Season, SeasonDocument } from "../models/seasonModel";
import { Team } from "../models/teamModel";
import { logger } from "../utils/logger";


export const SeasonService ={
    async createSeason(name:string,startDate:string,teamId:string):Promise<SeasonDocument>{
        try{
            const newSeason = new Season({
                name,
                startDate,
                teamId: new mongoose.Types.ObjectId(teamId),
              });
              await newSeason.save();
              await Team.findByIdAndUpdate(teamId, { $push: { seasons: newSeason._id } });
              return newSeason;
        }catch(error){
            logger.error(`Error al crear la temporada: ${error}`);
         throw new Error("Error al crear la temporada ");
        }
    },
    async updateSeason(id:string,name:string,endDate:string):Promise<SeasonDocument|null>{
        try{
            const updateSeason = await Season.findByIdAndUpdate(
                id,
                {name,endDate},
                {new:true});
            return updateSeason;
        }catch(error){
            logger.error(`Error al actualizar la temporada: ${error}`);
            throw new Error("Error al actualizar la temporada");
        }
    },
    async deleteSeason(id:string):Promise<void>{
        try{
            await Season.findByIdAndDelete(id);
        }catch(error){
            logger.error(`Error al eliminar la temporada: ${error}`);
            throw new Error("Error al eliminar la temporada");
        }
    },
    async getSeasonById(id:string):Promise<SeasonDocument|null>{
        try{
            const season =  await Season.findById(id);
            return season
        }catch(error){
            logger.error(`Error al obtener la temporada: ${error}`);
            throw new Error("Error al obtener la temporada");    
        }
    },
    async getAllSeason(teamId:string):Promise<SeasonDocument[]>{
        try{
            const seasons = await Season.find({teamId});
            return seasons;
        }catch(error){
            logger.error(`Error al obtener las temporadas: ${error}`);
            throw new Error("Error al obtener las temporadas");    
        }
    }
}
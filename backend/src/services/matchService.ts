import mongoose from "mongoose";
import { Match, MatchDocument } from "../models/matchModel";
import { Tournament } from "../models/tournamentModel";
import { logger } from "../utils/logger";


export const MatchService ={
    async createMatch(tournamentId:string,teamId:string,opposingTeamId:string,date:string):Promise<MatchDocument>{
        try{
            const newMatch = new Match({
                tournamentId: new mongoose.Types.ObjectId(tournamentId),
                opposingTeamId: new mongoose.Types.ObjectId(opposingTeamId),
                teamId: new mongoose.Types.ObjectId(teamId),
                totalRedCard:0,
                totalYellowCard:0,
                goalsOpposingTeam:0,
                totalGolTeam:0,
                totalAssists:0,
                date,
              });
              await newMatch.save();
              await Tournament.findByIdAndUpdate(teamId, { $push: { matchs: newMatch._id } });
              return newMatch;
        }catch(error){
            logger.error(`Error al crear el partido: ${error}`);
         throw new Error("Error al crear el partido ");
        }
    },
    // async updateMatch(
    //     id:string,
    //     totalRedCard:number,
    //     totalYellowCard:number,
    //     goalsTeam
    //     ):Promise<MatchDocument|null>{
    //     try{
    //         const updateMatch = await Match.findByIdAndUpdate(
    //             id,
    //             {name,endDate},
    //             {new:true});
    //         return updateMatch;
    //     }catch(error){
    //         logger.error(`Error al actualizar la temporada: ${error}`);
    //         throw new Error("Error al actualizar la temporada");
    //     }
    // },
    // async deleteSeason(id:string):Promise<void>{
    //     try{
    //         await Season.findByIdAndDelete(id);
    //     }catch(error){
    //         logger.error(`Error al eliminar la temporada: ${error}`);
    //         throw new Error("Error al eliminar la temporada");
    //     }
    // },
    // async getSeasonById(id:string):Promise<MatchDocument|null>{
    //     try{
    //         const season =  await Season.findById(id);
    //         return season
    //     }catch(error){
    //         logger.error(`Error al obtener la temporada: ${error}`);
    //         throw new Error("Error al obtener la temporada");    
    //     }
    // },
    // async getAllSeason(teamId:string):Promise<MatchDocument[]>{
    //     try{
    //         const seasons = await Season.find({teamId});
    //         return seasons;
    //     }catch(error){
    //         logger.error(`Error al obtener las temporadas: ${error}`);
    //         throw new Error("Error al obtener las temporadas");    
    //     }
    // }
}
import { Player } from "../models/playerModel";
import { getDataToken } from "./jwtHandler";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { PlayerService } from "../services/playerService";
import { Team } from "../models/teamModel";

export const PlayerController = {
    async createPlayer(req:Request,res:Response):Promise<void>{
        const {name,surname,dni,teamId} = req.body;
        const tokenPayload = getDataToken(req.headers.authorization);
        const userId = tokenPayload.sub;
        const existingPlayer =  await Player.findOne({dni})
        if(existingPlayer){
            res.status(400).json({ message: "Ya existe un jugador con ese dni" });
        }else{
            const playerService = PlayerService.createPlayer(name,surname,teamId,dni);
            playerService.then((player)=>{
                res.status(200).json(player)
            }).catch((error)=>{
                res.status(500).json({ message: "Error al añadir el jugador" });
                logger.error(`Error al añadir el jugador: ${error}`);
            })
        }
    }
}

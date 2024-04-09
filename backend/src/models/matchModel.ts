import mongoose, { Schema, Document, model } from "mongoose";
import { PlayerDocument } from "./playerModel";
import { TournamentDocument } from "./tournamentModel";
import { SeasonDocument } from "./seasonModel";

interface Changes {
  minute: number;
  playerIncomingId: Schema.Types.ObjectId;
  playerOutcomingID: Schema.Types.ObjectId;
}
//Momentos del partido(Amarillas, asistencias, goles, rojas, etc.)
interface MatchEvents {
  minute: number;
  playerId: Schema.Types.ObjectId;
}

enum Position {
  Goalkeeper = "GOALKEEPER",
  Defense = "DEFENSE",
  Midfielder = "MIDFIELDER",
  Forward = "FORWARD",
}

interface PlayerStartingLineup {
  position: Position;
  shirtNumber: number;
  playerId: Schema.Types.ObjectId;
  minutesPlayed: number;
}
  

export interface MatchDocument extends Document {
  tournamentId: Schema.Types.ObjectId;
  teamId: Schema.Types.ObjectId;
  opposingTeamId: Schema.Types.ObjectId;
  totalRedCard: number;
  totalYellowCard: number;
  goalsTeam: MatchEvents[];
  goalsOpposingTeam: number;
  changes: Changes[];
  totalChanges: number;
  assists: MatchEvents[];
  totalAssists: number;
  startingLineup: PlayerStartingLineup[];
  YellowCard: MatchEvents[];
  redCard: MatchEvents[];
  firstTime:number;
  lastTime:number;
  totalTime:number;
  totalGolTeam:number;
  date:string;
}

const matchSchema = new Schema<MatchDocument>(
  {
    tournamentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tournament",
    },
    teamId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    opposingTeamId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "OpposingTeam",
    },
    totalRedCard: {
      type: Number,
      required: true,
      trim: true,
    },
    totalYellowCard: {
      type: Number,
      required: true,
      trim: true,
    },
    goalsTeam: [
      {
        minute: { type: Number, required: true },
        playerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Players",
        },
      },
    ],
    goalsOpposingTeam: {
      type: Number,
      required: true,
      trim: true,
    },
    changes: [
      {
        minute: { type: Number, required: true },
        playerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Players",
        },
      },
    ],
    totalChanges: {
      type: Number,
      required: true,
      trim: true,
    },
    assists: [
      {
        minute: { type: Number, required: true },
        playerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Players",
        },
      },
    ],
    totalAssists: {
      type: Number,
      required: true,
      trim: true,
    },
    startingLineup: [
      {
        minute: { type: Number, required: true },
        playerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Players",
        },
      },
    ],
    YellowCard: [
      {
        minute: { type: Number, required: true },
        playerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Players",
        },
      },
    ],
    redCard: [
      {
        minute: { type: Number, required: true },
        playerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Players",
        },
      },
    ],lastTime:{
      type:Number,
      required:false,
      trim:true
    },
    firstTime:{
      type:Number,
      required:false,
      trim:true
    },
    totalTime:{
      type:Number,
      required:false,
      trim:true
    }
  },
  {
    timestamps: true,
  }
);

export const Match = model<MatchDocument>("Match", matchSchema);

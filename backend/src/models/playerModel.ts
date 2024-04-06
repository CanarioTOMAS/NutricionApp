import { string } from "joi";
import { Schema, Document, model } from "mongoose";

enum GoalType {
  Move = 'MOVE',
  Foul = 'FOUL',
  Penalty = 'PENALTY'
}

interface GoalPerGame {
  quantity:number;
  typeGoal:GoalType;
  idGame:Schema.Types.ObjectId
}

interface Assists{
  quantity:number;
  idGame:Schema.Types.ObjectId
}

export interface PlayerDocument extends Document {
  name: string;
  surname: string;
  teamId: Schema.Types.ObjectId;
  dni:string;
  goalsPerGame:GoalPerGame[];
  totalGoals:number;
  totalAssists:number;
  totalRedCard:number;
  directRedCard:number
  indirectRedCard:number;
  totalYellowCard:number;
  assists:Assists[];
  totalMatchs:number;
  starterMatchs:number;
  substituteMatchs:number;
  totalMinutePlayed:number
  imageProfile:string;
}

const playerSchema = new Schema<PlayerDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: false,
      trim: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    dni:{
        type:String,
        require:true,
        trim:true
    },
    goalsPerGame:[
      {
        quantity: { type: Number, required: true },
        typeGoal: { type: String, enum: Object.values(GoalType), required: true },
        idGame: { type: Schema.Types.ObjectId, required: true ,ref:'Matchs'}
      }
    ],
    totalGoals:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    totalAssists:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    totalRedCard:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    directRedCard:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    indirectRedCard:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    totalYellowCard:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    assists:[{
      quantity: { type: Number, required: true },
      idGame: { type: Schema.Types.ObjectId, required: true,ref:"Matchs" }
    }],
    totalMatchs:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    starterMatchs:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    substituteMatchs:{
      type:Number,
      required:false,
      trim:true,
      default:0
    },
    totalMinutePlayed:{
      type:Number,
      required:false,
      trim:true,
      default:0
    }
  },
  { timestamps: true }
);

export const Player = model<PlayerDocument>("Player", playerSchema);

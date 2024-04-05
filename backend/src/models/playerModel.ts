import { string } from "joi";
import { Schema, Document, model } from "mongoose";

export interface PlayerDocument extends Document {
  name: string;
  surname: string;
  teamId: Schema.Types.ObjectId;
  dni:string;
  //goles:string;
  // imageProfile:string;
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
    }
  },
  { timestamps: true }
);

export const Player = model<PlayerDocument>("Player", playerSchema);

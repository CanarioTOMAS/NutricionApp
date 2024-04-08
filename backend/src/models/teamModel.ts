import mongoose, { Schema, Document, model } from "mongoose";
import { PlayerDocument } from "./playerModel";
import { TournamentDocument } from "./tournamentModel";
import { SeasonDocument } from "./seasonModel";

export interface TeamDocument extends Document {
  name: string;
  description: string;
  userId: Schema.Types.ObjectId;
  players: Array<PlayerDocument>;
  // calendar:Array<string>;
  // stacts:Array<string>;
  tournaments:Array<TournamentDocument>;
  seasons:Array<SeasonDocument>;
  // imageProfile:string;
  // imageCover:string;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Players",required:false }],
    seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seasons",required:false }],
    tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tournaments",required:false }],
  },
  {
    timestamps: true,
  }
);

export const Team = model<TeamDocument>("Team", teamSchema);

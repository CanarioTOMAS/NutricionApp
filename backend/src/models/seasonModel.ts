import mongoose, { Schema, Document, model } from "mongoose";
import { TournamentDocument } from "./tournamentModel";

export interface SeasonDocument extends Document {
  name: string;
  startDate: string;
  endDate: string;
  tournaments: Array<TournamentDocument>;
  teamId: Schema.Types.ObjectId;
}
const seasonSchema = new Schema<SeasonDocument>(
  {
    name:{
        type:String,
        required:true,
        trim:true,
    },
    startDate:{
        type:String,
        required:true,
        trim:true,
    },
    endDate:{
        type:String,
        required:false,
        trim:true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tournaments" }],
  },
  {
    timestamps: true,
  }
);

export const Season= model<SeasonDocument>("Season", seasonSchema);

import mongoose, { Schema, Document, model } from "mongoose";
import { MatchDocument } from "./matchModel";

export interface TournamentDocument extends Document {
  name: string;
  matchs: Array<MatchDocument>;
  idSeason: Schema.Types.ObjectId;
}
const tournamentSchema = new Schema<TournamentDocument>(
  {
    name:{
        type:String,
        required:true,
        trim:true,
    },
    idSeason: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Season",
    },
    matchs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matchs" }],
  },
  {
    timestamps: true,
  }
);

export const Tournament= model<TournamentDocument>("Tournament", tournamentSchema);

import mongoose, { Schema, Document, model } from "mongoose";
import { PlayerDocument } from "./playerModel";

export interface TeamDocument extends Document {
  name: string;
  description: string;
  userId: Schema.Types.ObjectId;
  players: Array<PlayerDocument>;
  // calendar:Array<string>;
  // stacts:Array<string>;
  // tournament:Array<string>;
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
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Players" }],
  },
  {
    timestamps: true,
  }
);

export const Team = model<TeamDocument>("Team", teamSchema);

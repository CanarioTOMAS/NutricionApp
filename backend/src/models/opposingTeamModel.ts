import mongoose, { Schema, Document, model } from "mongoose";

export interface OpposingTeamDocument extends Document {
  name: string;
  ownGoals: number;
  totalGoals: number;
  againstGoals: number;
  teamId:Schema.Types.ObjectId;
  // imageProfile:string;
}

const opposingTeamSchema = new Schema<OpposingTeamDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownGoals: {
      type: Number,
      required: true,
      trim: true,
    },
    totalGoals: {
      type: Number,
      required: true,
      trim: true,
    },
    againstGoals: {
      type: Number,
      required: true,
      trim: true,
    },
    teamId:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    }
  },
  {
    timestamps: true,
  }
);

export const OpposingTeam = model<OpposingTeamDocument>(
  "OpposingTeam",
  opposingTeamSchema
);

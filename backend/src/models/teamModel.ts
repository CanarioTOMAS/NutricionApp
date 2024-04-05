import { Schema, Document, model } from "mongoose";

export interface TeamDocument extends Document {
  name: string;
  description: string;
  userId: Schema.Types.ObjectId;
  // players:Array<string>;
  // calendar:Array<string>;
  // stacts:Array<string>;
  // tournament:Array<string>;
  // imageProfile:string;
  // imageCover:string;
}

const teamSchema = new Schema<TeamDocument>({
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
    ref:'User'
  },
});

// Crear y exportar el modelo de usuario
export const Team = model<TeamDocument>("Team", teamSchema);

import { timeStamp } from "console";
import mongoose, { Schema, model, Document } from "mongoose";
import { TeamDocument } from "./teamModel";

// Definir la interfaz para el documento de usuario
export interface UserDocument extends Document {
  name: string;
  email: string;
  status: string;
  role: string;
  password: string;
  address: string;
  placeOfBirth: string;
  gender: string;
  phone: string;
  teams: Array<TeamDocument>;
}

// Definir el esquema del usuario
const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["Activo", "Prestamo", "Desactivado"],
      trim: true,
      required: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Profesor", "Club", "Jugador"],
      trim: true,
      required: false,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: false,
    },
    placeOfBirth: {
      type: String,
      trim: true,
      required: false,
    },
    phone: {
      type: String,
      trim: true,
      required: false,
    },
    gender: {
      type: String,
      trim: true,
      required: false,
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teams" }],
  },
  {
    timestamps: true,
  }
);

// Crear y exportar el modelo de usuario
export const User = model<UserDocument>("User", userSchema);

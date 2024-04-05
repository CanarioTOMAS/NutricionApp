import express from "express";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
import mongoose from "mongoose";

// URL de conexión a tu base de datos MongoDB
const MONGODB_URI = "mongodb://localhost:27017/bn-sport";

// Conectar a la base de datos
mongoose.connect(MONGODB_URI, {});

// Manejar eventos de conexión y error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión exitosa a MongoDB");
});
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", teamRoutes);

export default app;

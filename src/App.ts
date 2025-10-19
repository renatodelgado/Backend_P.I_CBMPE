import express from "express";
import { userRoutes } from "./routes/User.routes";
import cors from "cors";

export const app = express();

app.use(cors(
  { origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"] }
));
app.use(express.json());
app.use("/users", userRoutes);

app.post("/teste", (req, res) => {
  console.log("📩 Body recebido em /teste:", req.body);
  res.json({ recebido: req.body });
});


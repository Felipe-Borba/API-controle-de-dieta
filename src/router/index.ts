import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const routes = Router();

// Rotas dos controllers
routes.use("/user", userRoutes);
routes.use("/auth", authRoutes);

export default routes;

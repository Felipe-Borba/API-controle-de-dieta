import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import mealRoutes from "./meal.routes";

const routes = Router();

// Rotas dos controllers
routes.use("/user", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/meal", mealRoutes);

export default routes;

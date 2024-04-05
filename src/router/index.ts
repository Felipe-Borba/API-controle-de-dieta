import { Router } from "express";
import userRoutes from "./user.routes";

const routes = Router();

// Rotas dos controllers
routes.use("/user", userRoutes);

export default routes;

import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import AuthController from "../controller/authController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const routes = Router();
const controller = new AuthController();

// Rotas
routes.get("/public", (request: Request, response: Response) => {
  response.status(200).json({ message: "funcionou" });
});

routes.get(
  "/private",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    response.status(200).json({ message: "funcionou" });
  }
);

routes.post(
  "/logout",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    response.status(200).send({ token: null });
  }
);

routes.post("/login", controller.login);

routes.get("/me", function (request: Request, response: Response) {
  const authHeader = request.headers.authorization;
  const auth = authHeader;

  if (!auth) {
    return response.status(401).json({
      message: "Falha ao autenticar o token.",
    });
  }

  const [, token] = auth.split(" ");

  if (!token) {
    return response
      .status(401)
      .json({ auth: false, message: "Nenhum token informado." });
  }

  try {
    const jwtPayload = jwt.verify(token, process.env.AUTH_SECRET!);

    return response.status(200).json(jwtPayload);
  } catch (error) {
    return response.status(401).json({
      message: "Falha ao autenticar o token.",
    });
  }
});

export default routes;

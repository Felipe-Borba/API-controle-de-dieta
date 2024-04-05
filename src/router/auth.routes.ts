import { Router } from "express";
import jwt from "jsonwebtoken";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { NextFunction, Request, Response } from "express";

const routes = Router();

// Rotas
routes.get("/public", (request: Request, response: Response) => {
  response.status(200).send("funcionou");
});

routes.get(
  "/private",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    response.status(200).send("funcionou");
  }
);

routes.post(
  "/logout",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    response.status(200).send({ token: null });
  }
);

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

// Exporta
module.exports = routes;

import { User } from "@prisma/client";
import { Request, Response, Router } from "express";
import AuthController from "../controller/authController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const routes = Router();
const controller = new AuthController();

//TODO move to controller all these routes
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

routes.get(
  "/me",
  ensureAuthenticated,
  function (
    request: Request<{ user: User; iat?: number; exp?: number }>,
    response: Response
  ) {
    return response.status(200).json(request.params);
  }
);

export default routes;

import express, { NextFunction, Request, Response } from "express";
import router from "./router";

const app = express();
app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.baseUrl} - ${err.message}`);
  return res.status(400).send({ message: err.message });
});

app.get("/", (request: Request, response: Response) => {
  response.json({ message: "Hello World!" });
});

export default app;

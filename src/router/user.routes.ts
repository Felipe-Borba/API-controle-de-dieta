import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controller/user-controller";

const router = Router();
const controller = new UserController();

router.post(
  "/",
  body("name").optional(),
  body("email", "email is required").notEmpty(),
  controller.create
);

router.put(
  "/",
  body("id", "id is required").notEmpty(),
  body("name").optional(),
  body("email", "email is required").notEmpty(),
  controller.update
);

router.delete("/:id", controller.delete);

router.get("/", controller.list);

router.get("/:id", controller.getById);

export default router;

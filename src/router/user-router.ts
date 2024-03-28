import express from "express";
import UserController from "../controller/user-controller";

const router = express.Router();
const controller = new UserController();

router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/:id", controller.delete);
router.get("/", controller.list);
router.get("/:id", controller.getById);

export default router;

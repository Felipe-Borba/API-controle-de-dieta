import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export default class MealController {
  async create(
    request: Request<{ user: User }>,
    response: Response,
    next: NextFunction
  ) {
    const { name, description, data, diet } = request.body;
    const user = request.params.user;

    const meal = await prisma.meal.create({
      data: { name, data, diet, description, userId: user.id },
    });

    response.json(meal);
  }

  async update(
    request: Request<{ user: User }>,
    response: Response,
    next: NextFunction
  ) {
    const { id, name, description, data, diet } = request.body;
    const { user } = request.params;

    const meal = await prisma.meal.update({
      where: { id, userId: user.id },
      data: { name, data, description, diet },
    });

    response.json(meal);
  }

  async delete(
    request: Request<{ user: User; id: string }>,
    response: Response,
    next: NextFunction
  ) {
    const { id, user } = request.params;

    const meal = await prisma.meal.delete({
      where: { id, userId: user.id },
    });

    response.json(meal);
  }

  async list(
    request: Request<{ user: User }>,
    response: Response,
    next: NextFunction
  ) {
    const { user } = request.params;

    const meal = await prisma.meal.findMany({ where: { userId: user.id } });

    response.json(meal);
  }

  async getById(
    request: Request<{ user: User; id: string }>,
    response: Response,
    next: NextFunction
  ) {
    const { id, user } = request.params;

    const meal = await prisma.meal.findUnique({
      where: { id, userId: user.id },
    });

    response.json(meal);
  }
}

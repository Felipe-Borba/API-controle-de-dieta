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
      data: { name, data: new Date(data), diet, description, userId: user.id },
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
      data: { name, data: new Date(data), description, diet },
    });

    response.json(meal);
  }

  async delete(
    request: Request<{ user: User; id?: string }>,
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
    request: Request<{ user: User; id?: string }>,
    response: Response,
    next: NextFunction
  ) {
    const { id, user } = request.params;

    const meal = await prisma.meal.findUnique({
      where: { id, userId: user.id },
    });

    response.json(meal);
  }

  async getMetrics(
    request: Request<{ user: User }>,
    response: Response,
    next: NextFunction
  ) {
    const { user } = request.params;

    const totalMeal = await prisma.meal.count({ where: { userId: user.id } });

    const totalOnDietMeal = await prisma.meal.count({
      where: { userId: user.id, diet: true },
    });

    const totalOfDietMeal = await prisma.meal.count({
      where: { userId: user.id, diet: false },
    });

    let onDietStreak = 0;

    const lastOutOfDiet = await prisma.meal.findFirst({
      where: { diet: false },
      orderBy: { data: "asc" },
    });

    if (lastOutOfDiet) {
      onDietStreak = await prisma.meal.count({
        where: {
          userId: user.id,
          data: { gt: lastOutOfDiet.data },
          diet: true,
        },
      });
    }

    response.json({
      totalMeal,
      totalOnDietMeal,
      totalOfDietMeal,
      onDietStreak,
    });
  }
}

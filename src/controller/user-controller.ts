import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export default class UserController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password } = request.body;

      const hashedPassword = await hash(password, 8);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      response.json(user); // TODO hide password
    } catch (error) {
      return next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, id } = request.body;

      //TODO como fica a regra de atualização dos dados dos usuários?
      const user = await prisma.user.update({
        where: { id },
        data: { name, email },
      });

      response.json(user); // TODO hide password
    } catch (error) {
      return next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      //TODO quem tem permissão de deletar um usuário?
      const user = await prisma.user.delete({
        where: { id },
      });

      response.status(204);
    } catch (error) {
      return next(error);
    }
  }

  async list(request: Request, response: Response, next: NextFunction) {
    try {
      //TODO quem pode ver a listagem dos usuários?
      const user = await prisma.user.findMany();

      response.json(user); //TODO hide password
    } catch (error) {
      return next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      //TODO qualquer pessoa pode visualizar qualquer usuário?
      const { id } = request.params;

      const user = await prisma.user.findUnique({
        where: { id },
      });

      response.json(user); //TODO hide password
    } catch (error) {
      return next(error);
    }
  }
}

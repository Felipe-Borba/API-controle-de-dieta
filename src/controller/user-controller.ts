import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export default class UserController {
  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    const hashedPassword = await hash(password, 8);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    response.json(user); // TODO hide password
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, email, id, password } = request.body;

    //TODO como fica a regra de atualização dos dados dos usuários?
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });

    response.json(user); // TODO hide password
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    //TODO quem tem permissão de deletar um usuário?
    const user = await prisma.user.delete({
      where: { id },
    });

    response.json(user); //TODO hide password
  }

  async list(request: Request, response: Response, next: NextFunction) {
    //TODO quem pode ver a listagem dos usuários?
    const user = await prisma.user.findMany();

    response.json(user); //TODO hide password
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    //TODO qualquer pessoa pode visualizar qualquer usuário?
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    response.json(user); //TODO hide password
  }
}

import { Injectable } from "@nestjs/common";
import { PostgresPrismaService } from "./prisma-postgres.service";
import { MongoPrismaService } from "./prisma-mongo.service";

const prismaPostgres = new PostgresPrismaService();
const prismaMongo = new MongoPrismaService();

@Injectable()
export class AppService {

  async auth(token: string): Promise<string> {
    const usr = prismaPostgres.transaction.findFirst({
      where: {
        token: token
      }
    });
    return usr ? "ok" : "err";
  }

  async tokenize(log: CreditcardModel): Promise<string> {
    console.log(log);
    await prismaMongo.$connect();
    const l = await prismaMongo.token.create({
      data: {
        email: log.email,
        date: new Date(),
        serial: log.card_number
      }
    });
    console.log(l);
    return "ok";
  }

  async obtenerMongo(): Promise<string> {
    const response = await prismaMongo.token.findMany();
    console.log(response);
    return "ok";
  }
}

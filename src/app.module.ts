import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresPrismaService } from "./prisma-postgres.service";
import { MongoPrismaService } from "./prisma-mongo.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PostgresPrismaService, MongoPrismaService]
})
export class AppModule {
}
